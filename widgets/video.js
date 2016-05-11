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

		return <div className="widget widget--video">
			<a data-widget-change="url" href={url}>
				<img data-widget-change="image" className="img-responsive" src={host + path} />
			</a>
			<div data-widget-change="text" className="text-bottom">{text}</div>
		</div>;
	}

};