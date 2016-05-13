import classNames from 'classnames/bind';

const cx = classNames.bind(style);

export default class VideoWg extends React.Component {

	static propTypes = {
		data: React.PropTypes.object.isRequired,
		type: React.PropTypes.string.isRequired,
		host: React.PropTypes.string
	};

	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.data.url != nextState.data.url
			|| nextProps.data.text != nextState.data.text
			|| nextProps.data.image.path != nextState.data.image.path
	}

	render() {
		const { data: { url, image: { path }, text }, host } = this.props;

		return <div className={cx('widget', 'widget--video')}>
			<a href={url}>
				<img className={style['img-responsive']} src={host + path} />
			</a>
			<div className={style['text-bottom']}>{text}</div>
		</div>;
	}

};
