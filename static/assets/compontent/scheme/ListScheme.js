class ListScheme extends React.Component {
	state = { //类似data
		data: [],
		columns: [{
			title: '序号',
			key: 'id',
			dataIndex: 'id',
			width: 100,
		}, {
			title: '产品名称',
			key: 'schemeName',
			dataIndex: 'schemeName',
			width: 100,
		}, {
			title: '产品性质',
			key: 'isQuota',
			dataIndex: 'isQuota',
			width: 100,
		}, {
			title: '状态',
			key: 'statusName',
			dataIndex: 'statusName',
			width: 100,
		}, {
			title: '操作',
			key: 'opration',
			dataIndex: 'opration',
			width: 100,
		}],
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
		let that = this;
		that.setState({
			searchForm: {
				currentPage: pagination,
				pageSize: 8,
			}
		}, () => {
			that.fetch(that.state.searchForm);
		});
	};
	onShowSizeChange = (current, pageSize) => {
		let that = this;
		that.setState({
			searchForm: {
				currentPage: current,
				pageSize: pageSize,
			}
		}, () => {
			that.fetch(that.state.searchForm);
		});
	};
	fetch = (params = {}) => {
		let that = this;
		that.setState({
			loading: true
		});
		$.ajax({
			url: '/scheme/querySchemeAll',
			method: 'POST',
			data: params,
			type: 'json',
		}).done(function(data) {
			that.setState({
				spinning: false,
				loading: false,
				data: data.list,
				pagination: {
					totalPage: data.count,
				}
			});
		});
	};
	componentDidMount() { //类似mounted
		let that = this;
		that.fetch(that.state.searchForm);
	}
	render() {
		return(
			<div style={{marginBottom:'20px'}}>
				<div style={{ marginBottom:'20px' ,padding:12,background:'#fff',border:'1px solid #f2f2f2'}}>
				    <Row gutter={20}>
				      <Col span={6}>
				      	<Input addonBefore="姓名" placeholder="姓名" />
				      </Col>
				      <Col span={6}>
				      	<Input addonBefore="贷款金额" placeholder="贷款金额" />
				      </Col>
				      <Col span={6}>
				      	<Input addonBefore="当前进度" placeholder="当前进度" />
				      </Col>
				      <Col span={3} style={{ textAlign:'right'}}>
				      	<Button >重置</Button>
				      </Col>
				       <Col span={3}> 
				      	<Button type="primary" icon="search">查找</Button>
				      </Col>
				    </Row>
				</div>
				<div style={{border:'1px solid #f2f2f2'}}>
					<Table 
					 	rowKey="uid"
						scroll={{ x: 1000, y: 300 }} 
						size="middle" 
						style={{background:'#fff'}} 
						columns={this.state.columns} 
						dataSource={this.state.data} 
						loading={this.state.loading} 
						pagination={false}
						onRow={(record) => {
						    return {
					      		onClick: () => {console.log(record)},
					      		style:{
					      			fontSize:12,
					      		}
						    };
					  	}}
						onHeaderRow={(column) => {
						    return {
				      			style:{
					      			fontSize:12,
					      		}
						    };
					  	}}
					/>
			    </div>
			    
			    <Pagination 
				    style={{textAlign:'right',padding:10}} 
				    showSizeChanger 
				    onShowSizeChange={this.onShowSizeChange}
				    onChange={this.handleTableChange} 
				    total={this.state.pagination.totalPage} 
			    />
		    </div>
		);
	}
}