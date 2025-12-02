class ApiResponse {
  constructor(statusCode, message, payload, meta) {
    this.statusCode = statusCode;
    this.message = message;
    this.payload = payload;
    this.meta = meta;
  }

  send(res) {
    let responseObject = {
      success: true,
      message: this.message,
    };

    if (this.payload) {
      responseObject.payload = this.payload;
    }

    if (this.meta) {
      responseObject.meta = this.meta;
    }
    res.status(this.statusCode).json(responseObject);
  }
}

export default ApiResponse;

//? new ApiResponse(201, "message", payload).send()
