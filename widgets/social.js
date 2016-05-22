import classNames from 'classnames/bind';
import style from '../style/style.css';

const cx = classNames.bind(style);

export default class SocialWg extends React.Component {

	static propTypes = {
		data: React.PropTypes.object.isRequired,
		type: React.PropTypes.string.isRequired,
		host: React.PropTypes.string,
		slug: React.PropTypes.string
	};

	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.data.message != nextState.data.message
			|| nextProps.data.url != nextState.data.url
			|| nextProps.data.url != nextState.data.url
	}

	render() {
		const { data: { message, title, account }, type, host, slug } = this.props;

		return <div className={style['widget']}>
			<a
				target="_blank"
				href={`${host}/company/${slug}/`}
				className={cx('widget--social', `widget--${type}`)}
			>
				{'twitter' == type
					? <div className={style['h2']}>@<span>{ account }</span></div>
					: <div className={style['h2']}>{ title }</div>
				}
				<p>{ message }</p>
			</a>
		</div>;
	}

};
