const Layout = antd.Layout;
const Header = antd.Layout.Header;
const Content = antd.Layout.Content;
const Sider = antd.Layout.Sider;
const Menu = antd.Menu;
const SubMenu = antd.Menu.SubMenu;
const MenuItemGroup = antd.Menu.ItemGroup;
const Icon = antd.Icon;
const Breadcrumb = antd.Breadcrumb;
const Button = antd.Button;
const Input = antd.Input;
const Row = antd.Row;
const Table = antd.Table;
const Col = antd.Col;
const Pagination = antd.Pagination;
const TreeSelect = antd.TreeSelect;
const Modal = antd.Modal;
const Switch = antd.Switch;
class HomePage extends React.Component {
	init = () => { //组件的一些初始化操作
		window.addEventListener('hashchange', () => { //监听hash
			this.hashChange();
		});
	};
	state = {
		collapsed: false,
		logo: 'assets/common/image/ant-design.svg',
		footer: 'assets/common/image/react.svg',
		marginLeft: 200,
		theme:'dark',
		siderBackColor:'#001529',//001529
		siderColor:'#fff',
		sideBorder:'1px solid #000',
		display:'inline-block',
		nodeName: [],
		defaultOpenKeys: [],
		defaultSelectedKeys:[],
	};
	refreshSider = () =>{
		ReactDOM.render(<div></div>,document.getElementById('antd-sider')); //刷新菜单
		setTimeout(() => { //延迟0.1秒
			ReactDOM.render(<MySider 
				sideBorder = {this.state.sideBorder}
				siderBackColor={this.state.siderBackColor} 
				siderColor = {this.state.siderColor}  
				display = {this.state.display} 
				collapsed={this.state.collapsed} 
				theme={this.state.theme} 
				footer={this.state.footer} 
				logo={this.state.logo} 
				defaultSelectedKeys={this.state.defaultSelectedKeys} 
				defaultOpenKeys={this.state.defaultOpenKeys}/>
			,document.getElementById('antd-sider'));
			this.refresh();
		},1);
	}
	themeChange = () =>{
		if(this.state.theme == 'light') {
			this.setState({
				theme: 'dark',
				siderBackColor:'#001529',
				siderColor:'#fff',
				sideBorder:'1px solid #000',
			},()=>{
				this.refreshSider();
			});
		} else {
			this.setState({
				theme: 'light',
				siderBackColor:'#fff',
				siderColor:'#000',
				sideBorder:'1px solid #f2f2f2',
			},()=>{
				this.refreshSider();
			});
		}
	}
	toggle = () => {
		if(this.state.marginLeft == 200) {
			this.setState({
				collapsed: !this.state.collapsed,
				marginLeft: 80,
				display:'none',
			},()=>{
				this.refreshSider();
			});
		} else {
			this.setState({
				collapsed: !this.state.collapsed,
				marginLeft: 200,
				display:'inline-block',
			},()=>{
				this.refreshSider();
			});
		}
	};
	hashChange = () => {
		if(window.location.hash == '') window.location.hash = '#/index/index';
		let hash = window.location.hash;
		let defaultOpenKeys = hash.substr(2).split("/")[0].split("/");
		let defaultSelectedKeys = new Array(hash.substr(2).split("/").join(","));
		this.setState({
			defaultOpenKeys,
			defaultSelectedKeys,
		}, () => {
			this.refreshSider();
		});
	};
	refresh = () => {
		ReactDOM.render(<div><Icon type="loading" /></div>,document.getElementById('antd-main')); //刷新内容
		let $myRouter = window.router[window.location.hash];
		if($myRouter != undefined) {
			this.setState({
				nodeName: $myRouter.nodeName
			}, () => {
				setTimeout((main = 'antd-main') => { //延迟0.1秒
					ReactDOM.render($myRouter.compontent(), document.getElementById(main));
				},1);
			});
		} else {
			Modal.warning({
				title: '提示',
				content: '路由解析异常',
			});
		}
	}
	componentWillMount() {
		//按照路由渲染组件-->让后台知道
		this.init();
		this.hashChange();
	};
	componentDidMount() { /**/ };
	render() {
		return(
			<Layout>
				<div id="antd-sider"></div>
				<Layout style={{ padding:0,background: '#FCFCFF',marginLeft:this.state.marginLeft,height: '100vh'}}>
					<Header style={{height:'10vh',background: '#fff',paddingRight:20,paddingLeft:20,curdor: 'pointer',borderBottom: '1px solid #f2f2f2'}}>
						<div style={{float:'left'}}>
							<Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} style={{marginRight:20,cursor: 'pointer'}} onClick={this.toggle} />
							<Icon type="html5"   style={{marginRight:20,cursor: ''}} />
						</div>
						<div style={{float: 'right'}}>
							<Icon type="chrome"  style={{marginRight:20}} />
							<Icon type="twitter" style={{marginRight:20}} />
							<Switch
					          checked={this.state.theme === 'dark'}
					          onChange={this.themeChange}
					          checkedChildren="Dark"
					          unCheckedChildren="Light"
					          size="small"
					        />
						</div>
					</Header>
					<Header style={{background: '#fff',paddingLeft:20}}>
						<Breadcrumb style={{marginTop:20}}>
							<Breadcrumb.Item>{this.state.nodeName[0]}</Breadcrumb.Item>
							<Breadcrumb.Item style={{cursor:'pointer',color:'#1890ff'}} onClick={() => { this.refresh()} }>{this.state.nodeName[1]}</Breadcrumb.Item>
						</Breadcrumb>
					</Header>
					<Content id='antd-main' style={{ padding: 18, margin: 0, minHeight: 520 ,overflow: 'auto',fontSize:12}}></Content>
				</Layout>
			</Layout>
		);
	}
}