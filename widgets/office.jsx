import classNames from 'classnames/bind';
import style from '../style/style.css';

const cx = classNames.bind(style);

export default class OfficeWg extends React.Component {
	static propTypes = {
		data: React.PropTypes.object.isRequired,
		type: React.PropTypes.string.isRequired,
		host: React.PropTypes.string,
		slug: React.PropTypes.string
	};

	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.data.text != nextState.data.text || nextProps.data.image.path != nextState.data.image.path;
	}

	clickHandler = () => {
		const { host, slug } = this.props;
		window.open(`${host}/company/${slug}/`, '_blank');
	};

	render() {
		const {
			data: {
				image: { path },
				text
			},
			host
		} = this.props;

		return (
			<div className={cx('widget', 'widget--office', 'widget--office-two')} onClick={this.clickHandler}>
				<img className={style['img-responsive']} src={host + path} />
				<div className={style['text-lower-right']}>{text}</div>
			</div>
		);
	}
}
