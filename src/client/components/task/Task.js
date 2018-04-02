export default class Task {
  constructor(data){
    this.name = data.name;
    this.status = data.status;
    this.time = data.time;
    this.date = data.date;
    this.progressTime = data.progressTime;
    this.estimatedTime = data.estimatedTime;
    this.description = data.description;
  }
}