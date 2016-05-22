import classNames from 'classnames/bind';
import style from '../style/style.css';

const cx = classNames.bind(style);

export default class VideoWg extends React.Component {

	static propTypes = {
		data: React.PropTypes.object.isRequired,
		type: React.PropTypes.string.isRequired,
		host: React.PropTypes.string
	};

	constructor(props) {
		super(props);
		this.state = { video: false, width: 0, height: 0, src: '' };
	}

	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.data.url != nextState.data.url
			|| nextProps.data.text != nextState.data.text
			|| nextProps.data.image.path != nextState.data.image.path
	}

	clickHandler = e => {
		e.preventDefault();
		const { video } = this.state;
		if (video) return;

		const { data: { url } } = this.props;
		const vimeo = /https?:\/\/(?:www\.)?vimeo\.com\/(\d+)/.exec(url);

		this.setState({
			video: true,
			width: this.rels.dig.offsetWidth,
			height: this.rels.dig.offsetHeight,
			src: `http://player.vimeo.com/video/${vimeo}?title=0&amp;byline=0&amp;portrait=0&amp;autoplay=1`
		});
	}

	render() {
		const { data: { url, image: { path }, text }, host } = this.props,
			{ video, width, height, src } = this.state;

		const result = [<div rel="wig" className={cx('widget', 'widget--video')}>
			<a href={url} onClick={this.clickHandler}>
				<img className={style['img-responsive']} src={host + path} />
			</a>
			<div className={style['text-bottom']}>{text}</div>
		</div>];

		if (video) {
			result.push(<iframe width={width} height={height} src={src} frameborder="0" />);
		}
		
		return result;
	}

};
