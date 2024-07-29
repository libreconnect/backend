import env from '#start/env'

const rabbitConfig = {
  hostname: env.get('RABBIT_HOST', 'localhost') as string,
  user: env.get('RABBIT_USER') as string,
  password: env.get('RABBIT_PASSWORD') as string,
  port: Number(env.get('RABBIT_PORT')),
}

export default rabbitConfig
