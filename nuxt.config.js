import defaultMeta from './config/defaultMeta'
import sitemapConfig from './config/sitemapConfig'

const listENVS = {
	HOST_URL: process.env.HOST_URL,
	BASE_URL: process.env.BASE_URL,
	API_BASE_URL: process.env.API_URL
}
/*
 ** Axios Instance
 */
const AxiosInstance = {
	baseURL: process.env.BASE_URL,
	withCredentials: false,
	retry: true,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json'
	}
}

export default {
	target: 'server',
	// Duplicate .env
	env: listENVS,
	// Global page headers (https://go.nuxtjs.dev/config-head)
	head: {
		title: 'Alkeshop: Toko Alat Kesehatan',
		meta: defaultMeta,
		link: [
			{ rel: 'apple-touch-icon', href: '/apple-icon.png' },
			{ rel: 'icon', type: 'image/png', href: '/favicon.png' }
		],
		script: [
			{
				src: 'https://kit.fontawesome.com/ecde83b210.js'
			},
			{
				src: '/assets/plugins/jquery/dist/jquery.min.js',
				body: true
			},
			{
				src: '/assets/plugins/bootstrap/js/bootstrap.min.js',
				body: true
			},
			{
				src: '/assets/plugins/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.js',
				body: true
			},
			{
				src: '/assets/plugins/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.js',
				body: true
			},
			{
				src: '/assets/plugins/syo-timer/build/jquery.syotimer.min.js',
				body: true
			},
			{
				src: '/assets/js/script.js',
				body: true
			}
		]
	},

	render: {
		bundleRenderer: {
			shouldPreload: (file, type) => {
				return ['script', 'style', 'font'].includes(type)
			}
		}
	},

	// Global CSS (https://go.nuxtjs.dev/config-css)
	css: [
		'~/assets/plugins/themefisher-font/style.css',
		'~/assets/plugins/bootstrap/css/bootstrap.min.css',
		'~/assets/plugins/animate/animate.css',
		'~/assets/scss/main.scss'
		// '~/assets/plugins/slick/slick.css',
		// '~/assets/plugins/slick/slick-theme.css'
	],

	// Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
	plugins: [
		{ src: '~/plugins/vue-slick-carousel.js' },
		{ src: '~/plugins/helpers.js' },
		{ src: '~/plugins/vuelidate' },
		{ src: '~/plugins/jsonld' }
	],

	// Auto import components (https://go.nuxtjs.dev/config-components)
	components: true,

	// Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
	buildModules: ['@nuxtjs/eslint-module', '@nuxtjs/stylelint-module'],

	// Modules (https://go.nuxtjs.dev/config-modules)
	modules: [
		'@nuxtjs/axios',
		'@nuxtjs/auth',
		'@nuxtjs/style-resources',
		['nuxt-lazy-load', { directiveOnly: true }],
		'@nuxtjs/sitemap'
	],
	sitemap: sitemapConfig,

	// Axios module configuration (https://go.nuxtjs.dev/config-axios)
	axios: {
		proxy: true,
		AxiosInstance
	},

	publicRuntimeConfig: listENVS,

	privateRuntimeConfig: {
		axios: {
			baseURL: process.env.HOST_URL
		}
	},

	proxy: {
		'/base': {
			target: process.env.BASE_URL,
			pathRewrite: { '^/base/': '' },
			changeOrigin: true,
			onProxyReq(request) {
				request.setHeader('origin', process.env.BASE_URL)
			}
		}
	},

	// AUTH
	auth: {
		strategies: {
			local: {
				endpoints: {
					login: {
						url: '/base/login',
						method: 'post',
						propertyName: 'token'
					},
					logout: false,
					user: {
						url: '/base/current-user',
						method: 'get',
						propertyName: false
					}
				},
				autoLogout: true,
				tokenType: ''
			}
		},
		redirect: false
	},

	router: {
		middleware: ['redirection']
	},

	// Build Configuration (https://go.nuxtjs.dev/config-build)
	build: {
		extend(config, ctx) {},
		postcss: {
			preset: {
				autoprefixer: {
					overrideBrowserslist: ['last 2 versions']
				}
			}
		},
		optimizecss: true,
		optimization: {
			splitChunks: {
				minSize: 20000,
				maxSize: 500000
			}
		}
	}
}
