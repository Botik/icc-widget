import classNames from 'classnames/bind';
import style from '../style/style.css';

const cx = classNames.bind(style);

export default class VideoWg extends React.Component {
	static propTypes = {
		data: React.PropTypes.object.isRequired,
		type: React.PropTypes.string.isRequired,
		host: React.PropTypes.string,
		slug: React.PropTypes.string
	};

	shouldComponentUpdate(nextProps, nextState) {
		return (
			nextProps.data.title != nextState.data.title ||
			nextProps.data.text != nextState.data.text ||
			nextProps.data.section != nextState.data.section ||
			nextProps.data.image.path != nextState.data.image.path
		);
	}

	clickHandler = () => {
		const { host, slug } = this.props;
		window.open(`${host}/company/${slug}/`, '_blank');
	};

	render() {
		const {
			data: {
				section,
				image: { path },
				title,
				text
			},
			host
		} = this.props;

		return (
			<div className={cx('widget', 'widget--insight')} onClick={this.clickHandler}>
				<div className={style['insight-image']}>
					<img className={style['img-responsive']} src={host + path} />
				</div>
				<div className={style['insight-content']}>
					<div className={style['insight-category']}>{section}</div>
					<div className={cx('h2', 'insight-title')}>{title}</div>
					<div className={style['insight-text']}>{text}</div>
				</div>
			</div>
		);
	}
}
