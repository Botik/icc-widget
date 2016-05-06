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

		return <div className={`widget widget--quote widget--${type.replace('_', '-')}`} onClick={this.clickHandler}>
			<div className="widget--quote-content">
				<p data-widget-change="text">{ text }</p>
				<div className="quote-author">
					<em><strong data-widget-change="author">{ author }</strong>,<br /><span data-widget-change="position">{ position }</span></em>
				</div>
			</div>
		</div>;
	}

};
