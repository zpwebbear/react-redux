export function TaskListService(transport){
    this._transport = transport;

    this.getAll = async () => {
        return this._transport.get("/task-lists");
    }

    this.getById = async (id) => {
        return this._transport.get(`/task-lists/${id}`);
    }

    this.count = async () => {
        return this._transport.get('/task-lists/count');
    }

    this.create = async (body) => {
        return this._transport.post(`/task-lists`, {body});
    }

    this.replace = async (id, body) => {
        return this._transport.put(`/task-lists/${id}`, {body});
    }

    this.update = async (id, body) => {
        return this._transport.patch(`/task-lists/${id}`, {body});
    }

    this.delete = async (id) => {
        return this._transport.delete(`/task-lists/${id}`);
    }
}