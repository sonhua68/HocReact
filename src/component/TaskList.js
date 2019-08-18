import React, {Component} from 'react';
import TaskItem from './TaskItem';

class TaskList extends Component {

    constructor(props){
        super(props);
        this.state = {
            filterName : ' ',
            filterStatus : 0  //0: tất cả, 1: Kích Hoạt, 2: Ẩn
        }
    }

    onGetValue = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name] : value
        });
        this.props.onFilter(
            name === 'filterName' ? value : this.state.filterName,
            name === 'filterStatus' ? value : this.state.filterStatus
        )
    }

    render() {
        var {tasks} = this.props;
        var {filterName, filterStatus} = this.state;
        var lstItem = tasks.map((task, index) => {
            return <TaskItem key={task.id} index={index} task={task} 
                                onUpdateStatus={this.props.onUpdateStatus} onDelete={this.props.onDelete} onUpdate={this.props.onUpdate}/>
        });
        return (
            <div className="row mt-15">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th className="text-center">STT</th>
                                <th className="text-center">Tên</th>
                                <th className="text-center">Trạng Thái</th>
                                <th className="text-center">Hành Động</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td>
                                    <input type="text" className="form-control" name="filterName" value={filterName} onChange={this.onGetValue}></input>
                                </td>
                                <td>
                                    <select className="form-control" name="filterStatus" value={filterStatus} onChange={this.onGetValue}>
                                        <option value={0}>Tất cả</option>
                                        <option value={1}>Kích Hoạt</option>
                                        <option value={2}>Ẩn</option>
                                    </select>
                                </td>
                                <td></td>
                            </tr>
                            {lstItem}
                        </tbody>
                    </table>
                </div>
            </div>
            );
        }  
    }

export default TaskList;
