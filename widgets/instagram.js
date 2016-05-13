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

		return <div className={style['widget']}>
			<div className={style['widget--instagram']}>
				<div dangerouslySetInnerHTML={{__html: code}} />
				<a
					className={style['widget--instagram--icon']}
					href={url}
					target="_blank"
				>
					<i className="fa fa-instagram"></i>
				</a>
			</div>
		</div>;
	}

};
