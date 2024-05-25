const mode = 'dev'

const server = {

    petstore_service: {

        baseuri: {

            dev: "http://localhost:8082",

            prod: "https://petsy.inc"
        },

        modules: {

            order: {

                base: "/order",

                endpoints: {

                    place_order: "/",

                    validate_payment: "/payment"
                }
            },

            address: {

                base: '/user/address',

                endpoints: {

                    fetch: '/list',

                    add: '/add',

                    update: '/update',

                    delete: '/remove'
                }
            }
        }
    }
}

export function get_uri({service, module, endpoint}) {
      const baseuri = server[service]['baseuri'][mode];
      const mod = server[service]['modules'][module];
      const url = baseuri + mod['base'] + mod['endpoints'][endpoint];

      return url;
}
