export const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'API docs',
    },
    servers: [
      {
        url: `http: //localhost:${process.env.SERVER_PORT}`,
      },
    ],
    components: {
      schemas: {
        Hero: {
          type: "object",
          properties: {
            id: {
              type: "string",
              example: "655a82cb31afce356f709111"
            },
            name: {
              type: "string",
              description: "Name of a hero",
              example: "Han Solo"
            },
            superpower: {
              type: "string",
              description: "Superpower of a hero",
              example: `flying`
            },
            humilityScore: {
              type: "number",
              description: "how humble superhero is",
              example: 1
            }
          }
        },
        HeroBody: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "Name of a hero",
              example: "Han Solo"
            },
            superpower: {
              type: "string",
              description: "Superpower of a hero",
              example: `flying`
            },
            humilityScore: {
              type: "number",
              description: "how humble superhero is",
              example: 1
            }
          }
        }
      }
    },
    paths: {
      heroes: {
        get: {
          description: "Get list of herores",
          responses: {
            200: {
              description: "OK",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Hero",
                  },
                }
              }
            }
          }
        },
        post: {
          description: "Create a hero",
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/HeroBody",
                },
              },
            },
          },
          responses: {
            201: {
              description: "Created",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Hero",
                  },
                }
              }
            }
          }
        }
      },
    },
  },
  apis: ['./controllers/*.ts'],
}