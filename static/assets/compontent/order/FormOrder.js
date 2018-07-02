class FormOrder extends React.Component {
	state = { //类似data
		data: [],
		searchForm: {
			currentPage: 1,
			pageSize: 8,
		},
		pagination: {
			totalPage: 0,
		},
		loading: false,
	};
	handleTableChange = (pagination, filters, sorter) => {
		const pager = { ...this.state.pagination
		};
		pager.current = pagination.current;
		this.setState({
			pagination: pager,
		});
		this.fetch({});
	};
	fetch = (params = {}) => {
		console.log('params:', params);
		let that = this;
		that.setState({
			loading: true
		});
		$.ajax({
			url: '/scheme/querySchemeAll',
			method: 'POST',
			data: that.state.searchForm,
			type: 'json',
		}).done(function(data){
			const pagination = {
				...that.state.pagination
			};
			pagination.total = 200;
			that.setState({
				spinning: false,
				loading: false,
				data: data.list,
				pagination: pagination,
			});
		});
	};
	componentDidMount() { //类似mounted
		let that = this;
		that.fetch();
	}
	render() {
		return(
			<div style={{marginBottom:'20px'}}>
				进件新增页面
		    </div>
		);
	}
}