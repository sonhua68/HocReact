import React, {Component} from 'react';

class TaskItem extends Component {

    UPDStatus = () => {
        this.props.onUpdateStatus(this.props.task.id);
    }

    DelTask = () => {
        this.props.onDelete(this.props.task.id);
    }

    onUpdate = () => {
        this.props.onUpdate(this.props.task.id);
    }

    render() {
        var {task, index} = this.props;
        return (
            <tr>
                <td>{index + 1}</td>
                <td>{task.name}</td>
                <td className="text-center">
                    <span 
                        className={task.status ? 'label label-success' : 'label label-danger'}
                        onClick={this.UPDStatus}
                    >{task.status ? 'Kích Hoạt' : 'Ẩn'}</span>
                </td>
                <td className="text-center">
                    <button type="button" className="btn btn-warning" onClick={this.onUpdate}>
                        <span className="fa fa-pencil mr-5"></span> Sửa
                    </button>
                    &nbsp;
                    <button type="button" className="btn btn-danger" onClick={this.DelTask}>
                        <span className="fa fa-trash mr-5"></span> Xoá
                    </button>
                </td>
            </tr>
            );
        }  
    }

export default TaskItem;
