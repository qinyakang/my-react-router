class FormScheme extends React.Component {
	state = {
		value: undefined,
		treeData:[{
			label: 'Node1',
			value: '0-0',
			key: '0-0',
			children: [{
				label: 'Child Node1',
				value: '0-0-1',
				key: '0-0-1',
			}, {
				label: 'Child Node2',
				value: '0-0-2',
				key: '0-0-2',
			}],
		}, {
			label: 'Node2',
			value: '0-1',
			key: '0-1',
		}]
	};
	onChange = (value) => {
		console.log(value);
		this.setState({
			value
		});
	}
	render() {
		return(
			<div style={{marginBottom:'20px'}}>
				<TreeSelect
			        style={{ width: 300 }}
			        value={this.state.value}
			        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
			        treeData={this.state.treeData}
			        placeholder="Please select"
	                multiple
			        treeDefaultExpandAll
			        onChange={this.onChange}
		      	/>
		    </div>
		);
	}
}