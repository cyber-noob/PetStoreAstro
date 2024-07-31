const mode = 'dev'

const server = {

    petstore_service: {

        baseuri: {

            dev: "http://localhost:8082",

            prod: "https://petsy.inc"
        },

        modules: {

            products: {

                base: "/pdp",

                endpoints: {

                    fetch: "/details"
                }
            },

            order: {

                base: "/order",

                endpoints: {

                    place_order: "/",

                    validate_payment: "/payment"
                }
            },

            wishlist: {
                base: '/wishlist',

                endpoints: {
                    
                    fetch: '/items',

                    add: '/add',

                    delete: '/remove/item'
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
            },

            cart: {

                base: '/cart',

                endpoints: {

                    add: '/item',

                    fetch: '/items',

                    delete: '/item'
                }
            },

            slots: {

                base: '/slot',

                endpoints: {

                    fetch: '/'
                }
            },

            appointments: {

                base: '/appointments/schedule',

                endpoints: {

                    reserve: '/reserve',

                    unreserve: '/unreserve'
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
