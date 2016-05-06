export default class InstagramWg extends React.Component {

	static propTypes = {
		data: React.PropTypes.object.isRequired,
		type: React.PropTypes.string.isRequired,
		host: React.PropTypes.string
	};

	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.data.code != nextState.data.code
			|| nextProps.data.url != nextState.data.url
	}

	render() {
		const { code, url } = this.props.data;

		return <div className="widget">
			<div class="widget--instagram">
				<div data-widget-change="code" dangerouslySetInnerHTML={{__html: code}} />
				<a class="widget--instagram--icon" href={url} target="_blank" data-widget-change="url"><i class="fa fa-instagram"></i></a>
			</div>
		</div>;
	}

};
