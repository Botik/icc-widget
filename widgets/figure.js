export default class FigureWg extends React.Component {

	static propTypes = {
		data: React.PropTypes.object.isRequired,
		type: React.PropTypes.string.isRequired,
		host: React.PropTypes.string,
		slug: React.PropTypes.string
	};

	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.data.text != nextState.data.text
			|| nextProps.data.image.path != nextState.data.image.path
	}

	clickHandler = () => {
		const { host, slug } = this.props;
		window.open(`${host}/company/${slug}/`, '_blank');
	}

	render() {
		const { data: { image: { path }, text }, host } = this.props;

		return <div className="widget" onClick={this.clickHandler}>
			<img src={ host + path } className="img-responsive" data-widget-change="image" />
			<div className="text-bottom" data-widget-change="text">{ text }</div>
		</div>;
	}

};
