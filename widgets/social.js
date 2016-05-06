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
		const { data: { message, url, title, account }, type, host, slug } = this.props;

		return <div className="widget">
			<a data-widget-change="url" target="_blank" href={`${host}/company/${slug}/`} className={`widget--social widget--${type}`}>
				{'twitter' == type
					? <h2>@<span data-widget-change="account">{ account }</span></h2>
					: <h2 data-widget-change="title">{ title }</h2>
				}
				<p data-widget-change="message">{ message }</p>
			</a>
		</div>;
	}

};
