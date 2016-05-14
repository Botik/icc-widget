import classNames from 'classnames/bind';
import style from '../style/style.css';

const cx = classNames.bind(style);

export default class Widget extends React.Component {

	static propTypes = {
		company: React.PropTypes.object.isRequired
	};

	static defaultProps = {
		host: 'http://icanchoose.ru'
	};

	render() {
		const { company: {
			title,
			site,
			slug,
			logo,
			jobs,
			activity,
			location,
			resources: {
				fixed,
				other
			}
		}, host } = this.props,
			Carousel = require('./carousel').default,
			social = require('./social').default,
			quote = require('./quote').default,
			Office = require('./office').default,
			widgets = {
				video: require('./video').default,
				figure: require('./figure').default,
				insight: require('./insight').default,
				instagram: require('./instagram').default,
				twitter: social,
				facebook: social,
				quote_orange: quote,
				quote_red: quote,
				quote_turquoise: quote,
				quote_purple: quote
			},
			xs = 768 >= this.props.width,
			xxs = 479 >= this.props.width;

		const companyClasses = {
			'company': true,
			'company-xxs': xxs,
			'company-xs': (xs && !xxs)
		}

		return (
			<div className={cx(companyClasses)}>
				<div className={style['content']}>
					<div className={style['company-heading']}>
						<div className={style['company-heading-logo']}>
							<a target="_blank" href={site}>
								<img alt={title} src={host + logo} />
							</a>
						</div>
						<div className={style['company-heading-title']}>
							<div className={style['h1']}>
								<span className={style['small']}>Наша компания</span>
								<br />
								{title}
							</div>
						</div>
						<div className={style['company-heading-metadata']}>
							<span>
								<i className={cx('sprite', 'sprite-filter-world')} /> { activity }
							</span>
							<span>
								<i className={cx('sprite', 'sprite-filter-users')} /> 50 – 300 человек
							</span>
							<span>
								<i className={cx('sprite', 'sprite-filter-marker')} /> { location }
							</span>
						</div>
					</div>
					<div className={style['company-body']}>
						<div className={style['row']}>
							<div className={style[`col-${xxs ? 12 : 8}`]}>
								<Carousel>
									{fixed[0].data.slider.map((el, index) =>
										<img src={host + el.path} key={index} />
									)}
								</Carousel>
							</div>
							<div className={style[`col-${xxs ? 12 : 4}`]}>
								<Office host={host} slug={slug} {...fixed[1]} />
								<Office host={host} slug={slug} {...fixed[2]} />
							</div>
						</div>
						<div className={style['row']}>
							<div className={style[`col-${xxs ? 12 : 4}`]}>
								{Object.keys(other).filter(el => 0 == el % 3).map(el => {
									const Widget = widgets[other[el].type];
									return <Widget host={host} slug={slug} { ...other[el]} key={el} />;
								})}
							</div>
							<div className={style[`col-${xxs ? 12 : 4}`]}>
								{Object.keys(other).filter(el => 1 == el % 3).map(el => {
									const Widget = widgets[other[el].type];
									return <Widget host={host} slug={slug} { ...other[el]} key={el} />;
								})}
							</div>
							<div className={style[`col-${xxs ? 12 : 4}`]}>
								{Object.keys(other).filter(el => 2 == el % 3).map(el => {
									const Widget = widgets[other[el].type];
									return <Widget host={host} slug={slug} { ...other[el]} key={el} />;
								})}
							</div>
						</div>
					</div>
					{jobs
						? <div className={style['row']}>
								<div className={style['col-12']}>
									<a
										className={cx('widget', 'widget--help-job')}
										target="_blank"
										href={`http://icanchoose.ru/company/${slug}/job/`}
									>
										<div className={style['media']}>
											<img height={70} width={70} className={style['pull-left']} alt="Помогите найти!" src="http://icanchoose.ru/public/frontend/img/user_what.png" />
											<div className={style['media-body']}>
												<div className={cx('h3', 'media-heading')}>Помогите найти!</div>
												Разыскиваем специалиста в нашу компанию!<br />Узнайте кто нам нужен!
											</div>
										</div>
									</a>
								</div>
							</div>
						: ''}
				</div>
			</div>
		);
	}

};
