import classNames from 'classnames/bind';

const cx = classNames.bind(style);

export default class Carousel extends React.Component {

	static propTypes = {
		options: React.PropTypes.object,
		children: React.PropTypes.oneOfType([
			React.PropTypes.element,
			React.PropTypes.array
		]).isRequired
	};

	static defaultProps = {
		options: {
			interval: 5000,
			pause: 'hover',
			wrap: true,
			keyboard: true
		}
	};

	paused = null;
	sliding = null;
	active = null;

	constructor(props) {
		super(props);

		const childrenA = [].concat(props.children);
		const children = childrenA.map((el, index) => ({
			index,
			src: el.props.src,
			active: el.props.active || false,
			className: '',
			next: null,
			prev: null
		}));

		let prev = children[children.length - 1],
			active = false;

		for (let i of children) {
			i.prev = prev;
			prev.next = i;
			prev = i;

			if (i.active) {
				active = true;
				this.active = i;
			}
		}

		children[children.length - 1].next = children[0];

		if (!active) {
			children[0].active = true;
			this.active = children[0];
		}

		this.state = { children };
		this.trEnd = this.transitionEndEventName();
	}

	componentDidMount() {
		this.cycle();
	}

	componentWillUnmount() {
		this.pause();
	}

	transitionEndEventName = () => {
		const el = document.createElement('div'),
			transitions = {
				'transition': 'transitionend',
				'OTransition': 'otransitionend',  // oTransitionEnd in very old Opera
				'MozTransition': 'transitionend',
				'WebkitTransition': 'webkitTransitionEnd'
			};

		for (let i in transitions) {
			if (transitions.hasOwnProperty(i)) {
				return transitions[i];
			}
		}

		//TODO: throw 'TransitionEnd event is not supported in this browser';
	}

	cycle = e => {
		if (1 == this.state.children.length) return;
		e || (this.paused = false);
		this.interval && clearInterval(this.interval);
		// console.log('Set cycle ' + this.props.options.interval);

		this.props.options.interval
			&& !this.paused
			&& (this.interval = setInterval(this.next, this.props.options.interval))
	}

	pause = e => {
		if (1 == this.state.children.length) return;
		e || (this.paused = true);
		this.interval = clearInterval(this.interval);
		// console.log('Pause cycle');
	}

	mouseEnterHandler = () => {
		this.pause();
	}

	mouseLeaveHandler = () => {
		this.cycle();
	}

	next = e => {
		e && e.preventDefault();
		if (this.sliding) return;

		return this.slide('next');
	}

	prev = e => {
		e && e.preventDefault();
		if (this.sliding) return;

		return this.slide('prev');
	}

	to = e => {
		e.preventDefault();
		const oi = this.active.index;
		const next = this.state.children[0 | e.target.dataset.to];

		if (oi == next.index) return;

		this.slide(oi < next.index ? 'next' : 'prev', next);
	}

	getItemForDirection = (type, active) => 'next' == type ? active.next : active.prev;

	trEndHandler = e => {
		if (!this.sliding) return;
		this.active.className = '';
		this.active.active = false;
		this.$next.active = true;
		this.$next.className = '';
		this.forceUpdate();
		e && e.target.removeEventListener(this.trEnd, this.trEndHandler);
		this.sliding = false;
		this.active = this.$next;
	}

	slide = (type, next) => {
		const $active = this.active;
		const $next = next || this.getItemForDirection(type, $active);
		const isCycling = this.interval;
		const direction = type == 'next' ? 'left' : 'right';

		this.$next = $next;
		this.sliding = true;
		isCycling && this.pause();
		$next.active = false;
		$active.className = style[direction];
		$next.className = style[type];
		this.forceUpdate();

		setTimeout(() => {
			$next.className += ' ' + style[direction];
			this.forceUpdate();
		}, 5);

		if (this.trEnd) {
			const div = this.refs['item' + $next.index];
			div.addEventListener(this.trEnd, this.trEndHandler, false);
		}

		setTimeout(
			this.trEndHandler,
			this.props.options.interval
		);

		isCycling && this.cycle();

		return this;
	}

	render() {
		const { children } = this.state;

		return <div
			className={cx('widget', 'widget--office', 'widget--office-one')}
			onMouseEnter={this.mouseEnterHandler}
			onMouseLeave={this.mouseLeaveHandler}
		>
			{1 == children.length
				? ''
				: <div className={cx('carousel', 'slide')}>
					<ol className={style['carousel-indicators']} onClick={this.to}>
						{children.map(el =>
							<li className={cx({ active: el.active })} data-to={el.index} key={el.index}/>
						)}
					</ol>
					<div role="listbox" className={style['carousel-inner']}>
						{children.map(el =>
							<div
								key={el.index} ref={'item' + el.index}
								className={cx('item', el.className, { active: el.active })}
							>
								<img className={style['img-responsive']} src={el.src} alt="office" />
							</div>
						)}
					</div>
					<a
						href="http://icanchoose.ru/company/jll/#carousel-company-main"
						className={cx('left', 'carousel-control')}
						onClick={this.prev}
					>
						<span aria-hidden="true" className="fa fa-chevron-left" />
						<span className={style['sr-only']}>Previous</span>
					</a>
					<a
						href="http://icanchoose.ru/company/jll/#carousel-company-main"
						className={cx('right', 'carousel-control')}
						onClick={this.next}
					>
						<span aria-hidden="true" className="fa fa-chevron-right" />
						<span className={style['sr-only']}>Next</span>
					</a>
				</div>
			}
			{1 == children.length
				? <img src={children[0].src} className={style['img-responsive']} alt="office"/>
				: ''
			}
			<div className={style['text-lower-right']}>Наш офис</div>
		</div>;
	};

};
