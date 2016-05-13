import classNames from 'classnames/bind';

const cx = classNames.bind(style);

export default class QuoteWg extends React.Component {

	static propTypes = {
		data: React.PropTypes.object.isRequired,
		type: React.PropTypes.string.isRequired,
		host: React.PropTypes.string,
		slug: React.PropTypes.string
	};

	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.data.author != nextState.data.author
			|| nextProps.data.position != nextState.data.position
			|| nextProps.data.text != nextState.data.text
	}

	clickHandler = () => {
		const { host, slug } = this.props;
		window.open(`${host}/company/${slug}/`, '_blank');
	}

	render() {
		const { data: { text, position, author }, type } = this.props;

		return <div
			className={cx('widget', 'widget--quote', `widget--${type.replace('_', '-')}`)}
			onClick={this.clickHandler}
		>
			<div className={style['widget--quote-content']}>
				<p>{ text }</p>
				<div className={style['quote-author']}>
					<em><strong>{ author }</strong>,<br /><span>{ position }</span></em>
				</div>
			</div>
		</div>;
	}

};
