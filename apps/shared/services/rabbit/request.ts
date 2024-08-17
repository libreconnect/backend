import vine from '@vinejs/vine'

export default class AmqpRequest {
  constructor(private payload: any) {}

  async validateUsing(schema: any) {
    return await vine.validate({
      schema,
      data: this.payload,
    })
  }
}
