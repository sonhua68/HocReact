import React, {Component} from 'react';
import './App.css';
import TaskForm from './component/TaskForm';
import TaskControl from './component/TaskControl';
import TaskList from './component/TaskList';
import {findIndex, filter} from 'lodash';

class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            tasks : [], // id, name, status
            isDspForm : false,
            tskEdit : null,
            srch : {
                name : ' ',
                status : 0
            },
            keyword : ' ',
            sortBy : 'name',
            sortVal : 0 //0 Asc, 1 Desc
        }
    }

    UNSAFE_componentWillMount(){
        if (localStorage && localStorage.getItem('tasks')){
            var tasks = JSON.parse(localStorage.getItem('tasks'));
            this.setState({
                tasks : tasks
            });
        }
    }

    s4(){
        return Math.floor((1*Math.random())* 0x10000).toString(16).substring(1);
    }

    generateID(){
        return this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4();
    }

    onToggle = () => {
        if (this.state.isDspForm && this.state.tskEdit !== null){
            this.setState({
                tskEdit : null
            });
        }else{
            this.setState({
                isDspForm : !this.state.isDspForm
            });
        }
    }

    onShowForm = () => {
        this.setState({
            isDspForm : true
        });
    }

    onCloseForm = () => {
        this.setState({
            isDspForm : false,
            tskEdit : null
        });
    }

    UpdateData = (obj) => {
        var {tasks} = this.state;
        var i = this.findIndex(obj.id);
        if (i === -1){
            obj.id = this.generateID();
            tasks.push(obj);
        }
        else{
            tasks[i] = obj;
        }
        this.setState({
            tasks : tasks
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        this.setState({
            tskEdit : null
        });
    }

    UPDStatus = (id) => {
        var {tasks} = this.state;
        //var i = this.findIndex(id);
        var i = findIndex(tasks, (t) => { return t.id == id; });
        if (i !== -1){
            tasks[i].status = !tasks[i].status;
            this.setState({
                tasks : tasks
            });
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }

    findIndex = (id) => {
        var {tasks} = this.state;
        var result = -1
        tasks.forEach((task, index) => {
            if (task.id === id){
                result = index;
            }
        });
        return result;
    }

    DeleteTask = (id) => {
        var {tasks} = this.state;
        var i = this.findIndex(id);
        if (i !== -1){
            tasks.splice(i);
            this.setState({
                tasks : tasks
            });
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
        this.onCloseForm();
    }

    UpdateItem = (id) => {
        var {tasks} = this.state;
        var i = this.findIndex(id);
        var tskEdit = tasks[i];
        if (i !== -1){
            this.setState({
                tskEdit : tskEdit
            });
        }
        this.onShowForm();
    }

    FilterValue = (filName, filStatus) => {
        filStatus = parseInt(filStatus, 10);
        this.setState({
            srch : {
                name : filName,
                status : filStatus
            }
        });
    }

    FilterSearch = (keyfil) => {
        this.setState({
            keyword : keyfil
        });
    }

    GetSort = (sortBy, sortVal) => {
        sortVal = parseInt(sortVal, 10);
        this.setState({
            sortBy : sortBy,
            sortVal : sortVal
        });
    }

    render() {
        var { tasks , isDspForm, srch , keyword , sortBy, sortVal} = this.state;
        if (srch){
            if (srch.name){
                tasks = tasks.filter((task) => {
                    return task.name.toLowerCase().indexOf(srch.name) !== -1;
                });
                
            }
            if (srch.status !== 0){
                tasks = tasks.filter((task) => {
                    return task.status === (srch.status === 1 ? true : false);       
                });
            }
            if (keyword){
                tasks = filter(tasks, (t) => { return t.name.toLowerCase().indexOf(keyword) !== -1; });
            }
        }
        if (sortBy === 'name'){
            tasks.sort((a, b) => {
                if(a.name > b.name) return sortVal;
                else if (a.name < b.name) return -sortVal;
                else return 0;
            });
        }else{
            tasks.sort((a, b) => {
                if(a.status > b.status) return -sortVal;
                else if (a.status < b.status) return sortVal;
                else return 0;
            });
        }
        
        var elmTaskForm = isDspForm ? 
                            <TaskForm onCloseForm={this.onCloseForm} onSubmit={this.UpdateData} task={this.state.tskEdit}
                            /> 
                            : '';
        return (
                <Route exact path={`/home`} render={ (routerProps) => < Home routerProps={routerProps} />} />
                <div className="container">
                    <div className="text-center">
                        <h1>Quản lý Công Việc</h1><hr/>
                    </div>
                    <div className="row">
                        {/* Thêm Công Việc */}
                        {elmTaskForm}
                        <div className={isDspForm ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
                            <button type="button" className="btn btn-primary" onClick={this.onToggle}>
                                <span className="fa fa-plus mr-5"></span> Thêm Công Việc
                            </button>
                            <TaskControl onSearch={this.FilterSearch} onSort={this.GetSort} sortBy={sortBy} sortVal={sortVal}/>
                            {/* List */}
                            <TaskList tasks={tasks} onUpdateStatus={this.UPDStatus} 
                                        onDelete={this.DeleteTask} onUpdate={this.UpdateItem} onFilter={this.FilterValue}
                            />
                        </div>
                    </div>
                </div>
            );
        }  
    }

export default App;
