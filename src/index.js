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

class HomePage extends React.Component {
	init = () => { //组件的一些初始化操作
		window.addEventListener('hashchange', () => { //监听hash
			this.hashChange();
		});
	};
	state = {
		collapsed: false,
		logo: 'assets/common/image/logo.jpg',
		footer: 'assets/common/image/footer.jpg',
		marginLeft: 200,
		nodeName: [],
		defaultOpenKeys: [],
		defaultSelectedKeys:[],
	};
	toggle = () => {
		if(this.state.marginLeft == 200) {
			this.setState({
				collapsed: !this.state.collapsed,
				logo: 'assets/common/image/smallLogo.jpg',
				footer: 'assets/common/image/smallfooter.jpg',
				marginLeft: 80,
			},()=>{
				ReactDOM.render(<div></div>,document.getElementById('antd-sider')); //刷新菜单
				setTimeout(() => { //延迟0.1秒
					ReactDOM.render(<MySider collapsed={this.state.collapsed} footer={this.state.footer} logo={this.state.logo} defaultSelectedKeys={this.state.defaultSelectedKeys} defaultOpenKeys={this.state.defaultOpenKeys}/>
						, document.getElementById('antd-sider'));
					this.refresh();
				},1);
			});
		} else {
			this.setState({
				collapsed: !this.state.collapsed,
				logo: 'assets/common/image/logo.jpg',
				footer: 'assets/common/image/footer.jpg',
				marginLeft: 200,
			},()=>{
				ReactDOM.render(<div></div>,document.getElementById('antd-sider')); //刷新菜单
				setTimeout(() => { //延迟0.1秒
					ReactDOM.render(<MySider collapsed={this.state.collapsed} footer={this.state.footer} logo={this.state.logo} defaultSelectedKeys={this.state.defaultSelectedKeys} defaultOpenKeys={this.state.defaultOpenKeys}/>
						, document.getElementById('antd-sider'));
					this.refresh();
				},1);
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
			console.log(this.state.defaultOpenKeys);
			console.log(this.state.defaultSelectedKeys);
			ReactDOM.render(<div></div>,document.getElementById('antd-sider')); //刷新菜单
			setTimeout(() => { //延迟0.1秒
				ReactDOM.render(<MySider collapsed={this.state.collapsed} footer={this.state.footer} logo={this.state.logo} defaultSelectedKeys={this.state.defaultSelectedKeys} defaultOpenKeys={this.state.defaultOpenKeys}/>
					, document.getElementById('antd-sider'));
				this.refresh();
			},1);
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
				<div id="antd-sider">
					<MySider collapsed={this.state.collapsed} footer={this.state.footer} logo={this.state.logo} defaultSelectedKeys={this.state.defaultSelectedKeys} defaultOpenKeys={this.state.defaultOpenKeys}/>
				</div>
				<Layout style={{ padding:0,background: '#FCFCFF',marginLeft:this.state.marginLeft,height: '100vh'}}>
					<Header style={{background: '#fff',paddingRight:20,paddingLeft:20,curdor: 'pointer',borderBottom: '1px solid #f2f2f2'}}>
						<div style={{float: 'left'}}>
							<Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} style={{marginRight:20,cursor: 'pointer'}} onClick={this.toggle} />
							<Icon type="html5" />
						</div>
						<div style={{float: 'right'}}>
							<Icon type="chrome" style={{marginRight:20}} />
							<Icon type="twitter" />
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