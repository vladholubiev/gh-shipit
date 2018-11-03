module.exports = [
  {
    node: {
      name: 'turtle',
      releases: {
        edges: [
          {
            node: {
              publishedAt: '2016-01-12T18:06:42Z',
              name: 'Alpha 1',
              tag: {name: '0.0.1-alpha1', __typename: 'Ref'},
              __typename: 'Release'
            },
            __typename: 'ReleaseEdge'
          },
          {
            node: {
              publishedAt: '2016-01-16T04:10:26Z',
              name: '0.0.1 - Alpha 2',
              tag: {name: '0.0.1-alpha2', __typename: 'Ref'},
              __typename: 'Release'
            },
            __typename: 'ReleaseEdge'
          }
        ],
        __typename: 'ReleaseConnection'
      },
      __typename: 'Repository'
    },
    __typename: 'RepositoryEdge'
  },
  {
    node: {
      name: 'minami',
      releases: {edges: [], __typename: 'ReleaseConnection'},
      __typename: 'Repository'
    },
    __typename: 'RepositoryEdge'
  },
  {
    node: {
      name: 'turtle-examples',
      releases: {edges: [], __typename: 'ReleaseConnection'},
      __typename: 'Repository'
    },
    __typename: 'RepositoryEdge'
  },
  {
    node: {
      name: 'iopipe-js-core',
      releases: {
        edges: [
          {
            node: {
              publishedAt: '2017-01-11T13:57:23Z',
              name: 'v0.1.1 - metrics, fixes Serverless Framework local exec',
              tag: {name: 'v0.1.1', __typename: 'Ref'},
              __typename: 'Release'
            },
            __typename: 'ReleaseEdge'
          },
          {
            node: {
              publishedAt: '2017-01-31T15:40:23Z',
              name: 'Metrics bugfix and .decorate alias',
              tag: {name: 'v0.1.2', __typename: 'Ref'},
              __typename: 'Release'
            },
            __typename: 'ReleaseEdge'
          },
          {
            node: {
              publishedAt: '2017-02-14T21:33:44Z',
              name: 'Coldstarts, regional collectors, and stats fixes',
              tag: {name: 'v0.2.0', __typename: 'Ref'},
              __typename: 'Release'
            },
            __typename: 'ReleaseEdge'
          },
          {
            node: {
              publishedAt: '2017-03-06T19:03:07Z',
              name: 'Key updates',
              tag: {name: 'v0.2.1', __typename: 'Ref'},
              __typename: 'Release'
            },
            __typename: 'ReleaseEdge'
          },
          {
            node: {
              publishedAt: '2017-04-21T14:33:16Z',
              name: 'Performance improvements and non-blocking behavior',
              tag: {name: 'v0.3.0', __typename: 'Ref'},
              __typename: 'Release'
            },
            __typename: 'ReleaseEdge'
          },
          {
            node: {
              publishedAt: '2017-04-26T16:25:57Z',
              name: 'Update naming of client key',
              tag: {name: 'v0.3.1', __typename: 'Ref'},
              __typename: 'Release'
            },
            __typename: 'ReleaseEdge'
          },
          {
            node: {
              publishedAt: '2017-06-09T15:33:12Z',
              name: 'Size, speed, and a bit more data',
              tag: {name: 'v0.4.0', __typename: 'Ref'},
              __typename: 'Release'
            },
            __typename: 'ReleaseEdge'
          },
          {
            node: {
              publishedAt: '2017-06-09T19:32:13Z',
              name: 'Update CD',
              tag: {name: 'v0.4.1', __typename: 'Ref'},
              __typename: 'Release'
            },
            __typename: 'ReleaseEdge'
          },
          {
            node: {
              publishedAt: '2017-06-09T19:48:38Z',
              name: 'npm publish updates',
              tag: {name: 'v0.4.2', __typename: 'Ref'},
              __typename: 'Release'
            },
            __typename: 'ReleaseEdge'
          },
          {
            node: {
              publishedAt: '2017-06-13T15:05:04Z',
              name: 'Timeouts!',
              tag: {name: 'v0.5.0', __typename: 'Ref'},
              __typename: 'Release'
            },
            __typename: 'ReleaseEdge'
          },
          {
            node: {
              publishedAt: '2017-07-19T19:15:07Z',
              name: 'context.iopipe',
              tag: {name: 'v0.6.0', __typename: 'Ref'},
              __typename: 'Release'
            },
            __typename: 'ReleaseEdge'
          },
          {
            node: {
              publishedAt: '2017-07-21T14:25:04Z',
              name: 'Output Fixes',
              tag: {name: 'v0.7.0', __typename: 'Ref'},
              __typename: 'Release'
            },
            __typename: 'ReleaseEdge'
          },
          {
            node: {
              publishedAt: '2017-07-28T14:59:15Z',
              name: 'Plugin Support',
              tag: {name: 'v0.8.0', __typename: 'Ref'},
              __typename: 'Release'
            },
            __typename: 'ReleaseEdge'
          },
          {
            node: {
              publishedAt: '2017-08-10T19:19:12Z',
              name: '1.0 Release',
              tag: {name: 'v1.0.0', __typename: 'Ref'},
              __typename: 'Release'
            },
            __typename: 'ReleaseEdge'
          },
          {
            node: {
              publishedAt: '2017-08-18T14:07:26Z',
              name: 'Add support for ap-northeast-1 region',
              tag: {name: 'v1.0.1', __typename: 'Ref'},
              __typename: 'Release'
            },
            __typename: 'ReleaseEdge'
          },
          {
            node: {
              publishedAt: '2017-09-13T17:57:24Z',
              name: 'Plugin reporting and async hooks',
              tag: {name: 'v1.1.0', __typename: 'Ref'},
              __typename: 'Release'
            },
            __typename: 'ReleaseEdge'
          },
          {
            node: {
              publishedAt: '2017-10-30T15:06:10Z',
              name: 'Async hooks support and end timestamp collection',
              tag: {name: 'v1.2.0', __typename: 'Ref'},
              __typename: 'Release'
            },
            __typename: 'ReleaseEdge'
          },
          {
            node: {
              publishedAt: '2017-11-16T21:49:27Z',
              name: 'Function timeout bugfix',
              tag: {name: 'v1.2.1', __typename: 'Ref'},
              __typename: 'Release'
            },
            __typename: 'ReleaseEdge'
          },
          {
            node: {
              publishedAt: '2017-12-13T19:48:54Z',
              name: 'Enhanced configuration options',
              tag: {name: 'v1.3.0', __typename: 'Ref'},
              __typename: 'Release'
            },
            __typename: 'ReleaseEdge'
          },
          {
            node: {
              publishedAt: '2018-01-05T20:56:43Z',
              name: 'Configuration Additions - Employ Cosmiconfig',
              tag: {name: 'v1.4.0', __typename: 'Ref'},
              __typename: 'Release'
            },
            __typename: 'ReleaseEdge'
          },
          {
            node: {
              publishedAt: '2018-01-22T21:35:28Z',
              name: 'v1.5.0',
              tag: {name: 'v1.5.0', __typename: 'Ref'},
              __typename: 'Release'
            },
            __typename: 'ReleaseEdge'
          }
        ],
        __typename: 'ReleaseConnection'
      },
      __typename: 'Repository'
    },
    __typename: 'RepositoryEdge'
  },
  {
    node: {
      name: 'dockaless',
      releases: {edges: [], __typename: 'ReleaseConnection'},
      __typename: 'Repository'
    },
    __typename: 'RepositoryEdge'
  },
  {
    node: {
      name: 'turtle-shell',
      releases: {edges: [], __typename: 'ReleaseConnection'},
      __typename: 'Repository'
    },
    __typename: 'RepositoryEdge'
  },
  {
    node: {
      name: 'dockaless-examples',
      releases: {edges: [], __typename: 'ReleaseConnection'},
      __typename: 'Repository'
    },
    __typename: 'RepositoryEdge'
  },
  {
    node: {
      name: 'dockerbot-serverless',
      releases: {edges: [], __typename: 'ReleaseConnection'},
      __typename: 'Repository'
    },
    __typename: 'RepositoryEdge'
  },
  {
    node: {
      name: 'turtle-registry',
      releases: {edges: [], __typename: 'ReleaseConnection'},
      __typename: 'Repository'
    },
    __typename: 'RepositoryEdge'
  },
  {
    node: {
      name: 'lambda-shell',
      releases: {edges: [], __typename: 'ReleaseConnection'},
      __typename: 'Repository'
    },
    __typename: 'RepositoryEdge'
  },
  {
    node: {
      name: 'iopipe-python',
      releases: {
        edges: [
          {
            node: {
              publishedAt: '2016-11-29T18:48:48Z',
              name: '',
              tag: {name: 'v0.1.4', __typename: 'Ref'},
              __typename: 'Release'
            },
            __typename: 'ReleaseEdge'
          },
          {
            node: {
              publishedAt: '2016-12-09T15:54:39Z',
              name: '',
              tag: {name: 'v0.1.5', __typename: 'Ref'},
              __typename: 'Release'
            },
            __typename: 'ReleaseEdge'
          },
          {
            node: {
              publishedAt: '2016-12-09T19:01:38Z',
              name: '',
              tag: {name: 'v0.1.6', __typename: 'Ref'},
              __typename: 'Release'
            },
            __typename: 'ReleaseEdge'
          },
          {
            node: {
              publishedAt: '2017-01-04T17:23:45Z',
              name: '',
              tag: {name: 'v0.1.7', __typename: 'Ref'},
              __typename: 'Release'
            },
            __typename: 'ReleaseEdge'
          },
          {
            node: {
              publishedAt: '2017-01-31T17:24:39Z',
              name: 'Clear custom metrics between invocations',
              tag: {name: 'v0.1.8', __typename: 'Ref'},
              __typename: 'Release'
            },
            __typename: 'ReleaseEdge'
          },
          {
            node: {
              publishedAt: '2017-02-20T13:48:13Z',
              name: 'Improving CD',
              tag: {name: 'v0.1.9', __typename: 'Ref'},
              __typename: 'Release'
            },
            __typename: 'ReleaseEdge'
          },
          {
            node: {
              publishedAt: '2017-02-21T22:09:28Z',
              name: 'Regional collector support',
              tag: {name: 'v0.2.0', __typename: 'Ref'},
              __typename: 'Release'
            },
            __typename: 'ReleaseEdge'
          },
          {
            node: {
              publishedAt: '2017-02-28T15:49:02Z',
              name: 'Coldstart and load time support',
              tag: {name: 'v0.3.0', __typename: 'Ref'},
              __typename: 'Release'
            },
            __typename: 'ReleaseEdge'
          },
          {
            node: {
              publishedAt: '2017-03-01T16:58:27Z',
              name: 'Coldstarts patch',
              tag: {name: 'v0.3.1', __typename: 'Ref'},
              __typename: 'Release'
            },
            __typename: 'ReleaseEdge'
          },
          {
            node: {
              publishedAt: '2017-03-16T20:14:35Z',
              name: 'Error fixes, CPU data',
              tag: {name: 'v0.4.0', __typename: 'Ref'},
              __typename: 'Release'
            },
            __typename: 'ReleaseEdge'
          },
          {
            node: {
              publishedAt: '2017-03-21T15:28:14Z',
              name: 'Errors patch & improving TLS sessions',
              tag: {name: 'v0.4.1', __typename: 'Ref'},
              __typename: 'Release'
            },
            __typename: 'ReleaseEdge'
          },
          {
            node: {
              publishedAt: '2017-06-12T18:05:28Z',
              name: 'Python 3 support, code improvements',
              tag: {name: 'v0.5.1', __typename: 'Ref'},
              __typename: 'Release'
            },
            __typename: 'ReleaseEdge'
          },
          {
            node: {
              publishedAt: '2017-07-28T19:39:06Z',
              name: 'Critical fixes for errors and duration capture',
              tag: {name: 'v0.6.0', __typename: 'Ref'},
              __typename: 'Release'
            },
            __typename: 'ReleaseEdge'
          },
          {
            node: {
              publishedAt: '2017-08-08T17:27:48Z',
              name: 'Dependency bug fix',
              tag: {name: 'v0.6.1', __typename: 'Ref'},
              __typename: 'Release'
            },
            __typename: 'ReleaseEdge'
          },
          {
            node: {
              publishedAt: '2017-08-17T18:31:08Z',
              name: 'Adding support for environment variable configuration',
              tag: {name: 'v0.7.0', __typename: 'Ref'},
              __typename: 'Release'
            },
            __typename: 'ReleaseEdge'
          },
          {
            node: {
              publishedAt: '2017-08-18T14:09:36Z',
              name: 'Add ap-northeast-1 to supported regions',
              tag: {name: 'v0.7.1', __typename: 'Ref'},
              __typename: 'Release'
            },
            __typename: 'ReleaseEdge'
          },
          {
            node: {
              publishedAt: '2017-11-08T21:05:46Z',
              name: 'Ability to disable IOpipe in development via environment variable',
              tag: {name: 'v0.8.0', __typename: 'Ref'},
              __typename: 'Release'
            },
            __typename: 'ReleaseEdge'
          },
          {
            node: {
              publishedAt: '2017-12-06T19:20:28Z',
              name: 'v0.9.1',
              tag: {name: 'v0.9.1', __typename: 'Ref'},
              __typename: 'Release'
            },
            __typename: 'ReleaseEdge'
          },
          {
            node: {
              publishedAt: '2017-12-08T15:35:04Z',
              name: 'v0.9.2',
              tag: {name: 'v0.9.2', __typename: 'Ref'},
              __typename: 'Release'
            },
            __typename: 'ReleaseEdge'
          },
          {
            node: {
              publishedAt: '2018-01-15T18:25:24Z',
              name: 'v1.0.0',
              tag: {name: 'v1.0.0', __typename: 'Ref'},
              __typename: 'Release'
            },
            __typename: 'ReleaseEdge'
          }
        ],
        __typename: 'ReleaseConnection'
      },
      __typename: 'Repository'
    },
    __typename: 'RepositoryEdge'
  },
  {
    node: {
      name: 'lambda-workshop',
      releases: {edges: [], __typename: 'ReleaseConnection'},
      __typename: 'Repository'
    },
    __typename: 'RepositoryEdge'
  },
  {
    node: {
      name: 'http-aws-es',
      releases: {edges: [], __typename: 'ReleaseConnection'},
      __typename: 'Repository'
    },
    __typename: 'RepositoryEdge'
  },
  {
    node: {
      name: 'myst',
      releases: {edges: [], __typename: 'ReleaseConnection'},
      __typename: 'Repository'
    },
    __typename: 'RepositoryEdge'
  },
  {
    node: {
      name: 'serverless-plugin-iopipe',
      releases: {
        edges: [
          {
            node: {
              publishedAt: '2017-04-11T20:53:48Z',
              name: 'Initial 0.0.1',
              tag: {name: 'v0.0.1', __typename: 'Ref'},
              __typename: 'Release'
            },
            __typename: 'ReleaseEdge'
          },
          {
            node: {
              publishedAt: '2017-04-18T13:35:09Z',
              name: '.iopipe folder',
              tag: {name: '0.1.0', __typename: 'Ref'},
              __typename: 'Release'
            },
            __typename: 'ReleaseEdge'
          },
          {
            node: {
              publishedAt: '2017-04-18T17:18:59Z',
              name: 'Build updates',
              tag: {name: '0.1.1', __typename: 'Ref'},
              __typename: 'Release'
            },
            __typename: 'ReleaseEdge'
          },
          {
            node: {
              publishedAt: '2017-04-18T17:31:45Z',
              name: 'Use postinstall-build',
              tag: {name: '0.1.2', __typename: 'Ref'},
              __typename: 'Release'
            },
            __typename: 'ReleaseEdge'
          },
          {
            node: {
              publishedAt: '2017-04-18T18:34:29Z',
              name: 'Greeting',
              tag: {name: '0.1.3', __typename: 'Ref'},
              __typename: 'Release'
            },
            __typename: 'ReleaseEdge'
          },
          {
            node: {
              publishedAt: '2017-04-19T19:44:13Z',
              name: 'Release to NPM',
              tag: {name: 'v0.1.4', __typename: 'Ref'},
              __typename: 'Release'
            },
            __typename: 'ReleaseEdge'
          },
          {
            node: {
              publishedAt: '2017-04-19T22:23:51Z',
              name: 'Move some deps => devdeps',
              tag: {name: 'v0.1.5', __typename: 'Ref'},
              __typename: 'Release'
            },
            __typename: 'ReleaseEdge'
          },
          {
            node: {
              publishedAt: '2017-04-19T22:48:37Z',
              name: 'Remove postinstall-build',
              tag: {name: 'v0.1.6', __typename: 'Ref'},
              __typename: 'Release'
            },
            __typename: 'ReleaseEdge'
          },
          {
            node: {
              publishedAt: '2017-04-20T01:04:05Z',
              name: 'Node 4 Support',
              tag: {name: 'v0.1.7', __typename: 'Ref'},
              __typename: 'Release'
            },
            __typename: 'ReleaseEdge'
          },
          {
            node: {
              publishedAt: '2017-04-20T01:31:41Z',
              name: 'Wanted version fix',
              tag: {name: 'v0.1.8', __typename: 'Ref'},
              __typename: 'Release'
            },
            __typename: 'ReleaseEdge'
          },
          {
            node: {
              publishedAt: '2017-04-20T14:39:19Z',
              name: 'Use only Node.js Functions',
              tag: {name: 'v0.1.9', __typename: 'Ref'},
              __typename: 'Release'
            },
            __typename: 'ReleaseEdge'
          },
          {
            node: {
              publishedAt: '2017-04-20T22:17:57Z',
              name: 'Transform Test',
              tag: {name: 'v0.1.10', __typename: 'Ref'},
              __typename: 'Release'
            },
            __typename: 'ReleaseEdge'
          },
          {
            node: {
              publishedAt: '2017-04-21T21:19:55Z',
              name: 'Add Stats',
              tag: {name: 'v0.1.11', __typename: 'Ref'},
              __typename: 'Release'
            },
            __typename: 'ReleaseEdge'
          },
          {
            node: {
              publishedAt: '2017-05-04T20:06:43Z',
              name: 'Rename source key to installMethod',
              tag: {name: 'v0.1.12', __typename: 'Ref'},
              __typename: 'Release'
            },
            __typename: 'ReleaseEdge'
          },
          {
            node: {
              publishedAt: '2017-05-12T15:22:20Z',
              name: 'New Serverless Packaging Commands',
              tag: {name: 'v0.1.13', __typename: 'Ref'},
              __typename: 'Release'
            },
            __typename: 'ReleaseEdge'
          },
          {
            node: {
              publishedAt: '2017-05-19T20:34:55Z',
              name: 'Fix auto-upgrade',
              tag: {name: 'v0.1.14', __typename: 'Ref'},
              __typename: 'Release'
            },
            __typename: 'ReleaseEdge'
          },
          {
            node: {
              publishedAt: '2017-05-19T21:11:23Z',
              name: 'Nix network dependency in test',
              tag: {name: 'v0.1.15', __typename: 'Ref'},
              __typename: 'Release'
            },
            __typename: 'ReleaseEdge'
          },
          {
            node: {
              publishedAt: '2017-05-25T14:45:36Z',
              name: 'Update dependency checks',
              tag: {name: 'v0.1.16', __typename: 'Ref'},
              __typename: 'Release'
            },
            __typename: 'ReleaseEdge'
          },
          {
            node: {
              publishedAt: '2017-06-09T17:27:42Z',
              name: 'Drop AST Transform',
              tag: {name: 'v0.2.0', __typename: 'Ref'},
              __typename: 'Release'
            },
            __typename: 'ReleaseEdge'
          },
          {
            node: {
              publishedAt: '2017-06-09T23:47:05Z',
              name: 'Support Node 4',
              tag: {name: 'v0.2.1', __typename: 'Ref'},
              __typename: 'Release'
            },
            __typename: 'ReleaseEdge'
          },
          {
            node: {
              publishedAt: '2017-06-21T19:42:56Z',
              name: 'Webpack',
              tag: {name: 'v0.3.0', __typename: 'Ref'},
              __typename: 'Release'
            },
            __typename: 'ReleaseEdge'
          },
          {
            node: {
              publishedAt: '2017-06-23T20:38:32Z',
              name: 'Bug fix',
              tag: {name: 'v0.3.1', __typename: 'Ref'},
              __typename: 'Release'
            },
            __typename: 'ReleaseEdge'
          },
          {
            node: {
              publishedAt: '2017-08-16T15:15:13Z',
              name: 'Fix auto-upgrade',
              tag: {name: 'v0.3.2', __typename: 'Ref'},
              __typename: 'Release'
            },
            __typename: 'ReleaseEdge'
          },
          {
            node: {
              publishedAt: '2017-08-31T16:31:24Z',
              name: 'Allow missing package.json next to serverless.yml',
              tag: {name: 'v0.3.3', __typename: 'Ref'},
              __typename: 'Release'
            },
            __typename: 'ReleaseEdge'
          }
        ],
        __typename: 'ReleaseConnection'
      },
      __typename: 'Repository'
    },
    __typename: 'RepositoryEdge'
  },
  {
    node: {
      name: 'examples',
      releases: {edges: [], __typename: 'ReleaseConnection'},
      __typename: 'Repository'
    },
    __typename: 'RepositoryEdge'
  },
  {
    node: {
      name: 'awslambda-reverse-proxy',
      releases: {edges: [], __typename: 'ReleaseConnection'},
      __typename: 'Repository'
    },
    __typename: 'RepositoryEdge'
  },
  {
    node: {
      name: 'sqs-to-lambda-async',
      releases: {
        edges: [
          {
            node: {
              publishedAt: '2017-06-29T20:04:20Z',
              name: 'Initial',
              tag: {name: 'v0.1.0', __typename: 'Ref'},
              __typename: 'Release'
            },
            __typename: 'ReleaseEdge'
          },
          {
            node: {
              publishedAt: '2017-10-18T20:21:46Z',
              name: 'Better error handling',
              tag: {name: 'v0.2.0', __typename: 'Ref'},
              __typename: 'Release'
            },
            __typename: 'ReleaseEdge'
          }
        ],
        __typename: 'ReleaseConnection'
      },
      __typename: 'Repository'
    },
    __typename: 'RepositoryEdge'
  },
  {
    node: {
      name: 'iopipe-plugin-profiler',
      releases: {
        edges: [
          {
            node: {
              publishedAt: '2017-12-05T18:38:43Z',
              name: 'Initial Release',
              tag: {name: 'v0.1.0', __typename: 'Ref'},
              __typename: 'Release'
            },
            __typename: 'ReleaseEdge'
          }
        ],
        __typename: 'ReleaseConnection'
      },
      __typename: 'Repository'
    },
    __typename: 'RepositoryEdge'
  },
  {
    node: {
      name: 'awslambda-npm-install',
      releases: {edges: [], __typename: 'ReleaseConnection'},
      __typename: 'Repository'
    },
    __typename: 'RepositoryEdge'
  },
  {
    node: {
      name: 'v8-profiler',
      releases: {edges: [], __typename: 'ReleaseConnection'},
      __typename: 'Repository'
    },
    __typename: 'RepositoryEdge'
  },
  {
    node: {
      name: 'performance-node',
      releases: {
        edges: [
          {
            node: {
              publishedAt: '2017-07-27T17:26:01Z',
              name: 'Initial Release',
              tag: {name: 'v0.1.0', __typename: 'Ref'},
              __typename: 'Release'
            },
            __typename: 'ReleaseEdge'
          },
          {
            node: {
              publishedAt: '2017-07-27T21:25:55Z',
              name: 'Add Timestamp Option',
              tag: {name: 'v0.2.0', __typename: 'Ref'},
              __typename: 'Release'
            },
            __typename: 'ReleaseEdge'
          }
        ],
        __typename: 'ReleaseConnection'
      },
      __typename: 'Repository'
    },
    __typename: 'RepositoryEdge'
  },
  {
    node: {
      name: 'iopipe-plugin-trace',
      releases: {
        edges: [
          {
            node: {
              publishedAt: '2017-08-08T17:05:35Z',
              name: 'Initial Release',
              tag: {name: 'v0.1.0', __typename: 'Ref'},
              __typename: 'Release'
            },
            __typename: 'ReleaseEdge'
          },
          {
            node: {
              publishedAt: '2017-08-09T20:59:18Z',
              name: 'iopipe lib as dependency',
              tag: {name: 'v0.1.1', __typename: 'Ref'},
              __typename: 'Release'
            },
            __typename: 'ReleaseEdge'
          },
          {
            node: {
              publishedAt: '2017-08-22T15:04:26Z',
              name: 'Upgrade iopipe dependency',
              tag: {name: 'v0.1.2', __typename: 'Ref'},
              __typename: 'Release'
            },
            __typename: 'ReleaseEdge'
          },
          {
            node: {
              publishedAt: '2017-09-29T18:23:37Z',
              name: 'Allow plugin meta data',
              tag: {name: 'v0.2.0', __typename: 'Ref'},
              __typename: 'Release'
            },
            __typename: 'ReleaseEdge'
          },
          {
            node: {
              publishedAt: '2017-12-12T15:40:11Z',
              name: 'Rename to @iopipe/trace',
              tag: {name: 'v0.3.0', __typename: 'Ref'},
              __typename: 'Release'
            },
            __typename: 'ReleaseEdge'
          }
        ],
        __typename: 'ReleaseConnection'
      },
      __typename: 'Repository'
    },
    __typename: 'RepositoryEdge'
  },
  {
    node: {
      name: 'v8-profiler-lambda',
      releases: {edges: [{node: null, __typename: 'ReleaseEdge'}], __typename: 'ReleaseConnection'},
      __typename: 'Repository'
    },
    __typename: 'RepositoryEdge'
  },
  {
    node: {
      name: 'iopipe-js',
      releases: {
        edges: [
          {
            node: {
              publishedAt: '2018-01-25T17:09:45Z',
              name: 'v1.5.0',
              tag: {name: 'v1.5.0', __typename: 'Ref'},
              __typename: 'Release'
            },
            __typename: 'ReleaseEdge'
          }
        ],
        __typename: 'ReleaseConnection'
      },
      __typename: 'Repository'
    },
    __typename: 'RepositoryEdge'
  },
  {
    node: {
      name: 'servers.lol',
      releases: {edges: [], __typename: 'ReleaseConnection'},
      __typename: 'Repository'
    },
    __typename: 'RepositoryEdge'
  },
  {
    node: {
      name: 'slackbot-bionic-eye',
      releases: {edges: [], __typename: 'ReleaseConnection'},
      __typename: 'Repository'
    },
    __typename: 'RepositoryEdge'
  },
  {
    node: {
      name: 'iopipe-scripts',
      releases: {
        edges: [
          {
            node: {
              publishedAt: '2017-12-12T15:22:51Z',
              name: '1.0.10',
              tag: {name: 'v1.0.10', __typename: 'Ref'},
              __typename: 'Release'
            },
            __typename: 'ReleaseEdge'
          },
          {
            node: {
              publishedAt: '2017-12-12T17:53:12Z',
              name: 'Node 6 support',
              tag: {name: 'v1.1.0', __typename: 'Ref'},
              __typename: 'Release'
            },
            __typename: 'ReleaseEdge'
          },
          {
            node: {
              publishedAt: '2017-12-12T18:09:21Z',
              name: 'Add babel async transform',
              tag: {name: 'v1.1.1', __typename: 'Ref'},
              __typename: 'Release'
            },
            __typename: 'ReleaseEdge'
          },
          {
            node: {
              publishedAt: '2017-12-21T14:50:11Z',
              name: 'v1.2.0',
              tag: {name: 'v1.2.0', __typename: 'Ref'},
              __typename: 'Release'
            },
            __typename: 'ReleaseEdge'
          },
          {
            node: {
              publishedAt: '2017-12-21T20:17:13Z',
              name: 'v1.3.0',
              tag: {name: 'v1.3.0', __typename: 'Ref'},
              __typename: 'Release'
            },
            __typename: 'ReleaseEdge'
          },
          {
            node: {
              publishedAt: '2017-12-22T14:36:55Z',
              name: 'v1.4.0',
              tag: {name: 'v1.4.0', __typename: 'Ref'},
              __typename: 'Release'
            },
            __typename: 'ReleaseEdge'
          }
        ],
        __typename: 'ReleaseConnection'
      },
      __typename: 'Repository'
    },
    __typename: 'RepositoryEdge'
  },
  {
    node: {
      name: 'elasticsearch',
      releases: {edges: [], __typename: 'ReleaseConnection'},
      __typename: 'Repository'
    },
    __typename: 'RepositoryEdge'
  },
  {
    node: {
      name: 'eslint-config-iopipe',
      releases: {
        edges: [
          {
            node: {
              publishedAt: '2017-12-12T15:19:36Z',
              name: '1.0.2',
              tag: {name: 'v1.0.2', __typename: 'Ref'},
              __typename: 'Release'
            },
            __typename: 'ReleaseEdge'
          }
        ],
        __typename: 'ReleaseConnection'
      },
      __typename: 'Repository'
    },
    __typename: 'RepositoryEdge'
  },
  {
    node: {
      name: 'iopipe-java-core',
      releases: {edges: [], __typename: 'ReleaseConnection'},
      __typename: 'Repository'
    },
    __typename: 'RepositoryEdge'
  },
  {
    node: {
      name: 'aws-sar-examples',
      releases: {edges: [], __typename: 'ReleaseConnection'},
      __typename: 'Repository'
    },
    __typename: 'RepositoryEdge'
  },
  {
    node: {
      name: 'node-nettraf',
      releases: {edges: [], __typename: 'ReleaseConnection'},
      __typename: 'Repository'
    },
    __typename: 'RepositoryEdge'
  },
  {
    node: {
      name: 'iopipe-js-config',
      releases: {
        edges: [
          {
            node: {
              publishedAt: '2018-01-11T17:56:29Z',
              name: 'Initial Release',
              tag: {name: 'v0.1.0', __typename: 'Ref'},
              __typename: 'Release'
            },
            __typename: 'ReleaseEdge'
          },
          {
            node: {
              publishedAt: '2018-01-19T04:18:16Z',
              name: 'v0.2.0',
              tag: {name: 'v0.2.0', __typename: 'Ref'},
              __typename: 'Release'
            },
            __typename: 'ReleaseEdge'
          },
          {
            node: {
              publishedAt: '2018-01-23T01:22:15Z',
              name: 'v0.2.1',
              tag: {name: 'v0.2.1', __typename: 'Ref'},
              __typename: 'Release'
            },
            __typename: 'ReleaseEdge'
          },
          {
            node: {
              publishedAt: '2018-01-23T20:26:30Z',
              name: 'v0.3.0',
              tag: {name: 'v0.3.0', __typename: 'Ref'},
              __typename: 'Release'
            },
            __typename: 'ReleaseEdge'
          }
        ],
        __typename: 'ReleaseConnection'
      },
      __typename: 'Repository'
    },
    __typename: 'RepositoryEdge'
  }
];
