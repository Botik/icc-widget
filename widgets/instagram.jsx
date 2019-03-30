export default class InstagramWg extends React.Component {
	static propTypes = {
		data: React.PropTypes.object.isRequired,
		type: React.PropTypes.string.isRequired,
		host: React.PropTypes.string
	};

	shouldComponentUpdate(nextProps, nextState) {
		return false;
	}

	render() {
		return null;
	}
}
