export default class VideoWg extends React.Component {

	static propTypes = {
		data: React.PropTypes.object.isRequired,
		type: React.PropTypes.string.isRequired,
		host: React.PropTypes.string,
		slug: React.PropTypes.string
	};

	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.data.title != nextState.data.title
			|| nextProps.data.text != nextState.data.text
			|| nextProps.data.section != nextState.data.section
			|| nextProps.data.image.path != nextState.data.image.path
	}

	clickHandler = () => {
		const { host, slug } = this.props;
		window.open(`${host}/company/${slug}/`, '_blank');
	}
	
	render() {
		const { data: { section, image: { path }, title, text }, host } = this.props;

		return <div className="widget widget--insight" onClick={this.clickHandler}>
				<div className="insight-image">
					<img data-widget-change="image" className="img-responsive" src={host + path} />
				</div>
				<div className="insight-content">
					<div data-widget-change="section" className="insight-category">{section}</div>
					<h2 data-widget-change="title" className="insight-title">{title}</h2>
					<div data-widget-change="text" className="insight-text">{text}</div>
				</div>
			</div>;
	}

};
