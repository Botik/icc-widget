export default class OfficeWg extends React.Component {

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

		return <div className="widget widget--office widget--office-two" onClick={this.clickHandler}>
			<img data-widget-change="image" className="img-responsive" src={ host + path } />
			<div data-widget-change="text" className="text-lower-right">{ text }</div>
		</div>;
	}

};
