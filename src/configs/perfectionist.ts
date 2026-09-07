import type { OxlintConfig } from 'oxlint'

import type { OptionsOverrides } from '../types.ts'

import { GLOB_JSX, GLOB_SRC_EXT, GLOB_TSX } from '../globs.ts'
import { pluginPerfectionist } from '../plugins.ts'

export function perfectionist(options: OptionsOverrides = {}): OxlintConfig {
  const { overrides = {} } = options

  return {
    jsPlugins: [pluginPerfectionist],
    rules: {
      'perfectionist/sort-array-includes': ['error', { order: 'asc', type: 'natural' }],
      'perfectionist/sort-exports': [
        'error',
        { order: 'asc', groups: ['value-export', 'type-export'], type: 'natural' },
      ],
      'perfectionist/sort-interfaces': [
        'error',
        { order: 'asc', groups: ['index-signature', 'unknown', 'method'], type: 'natural' },
      ],
      'perfectionist/sort-intersection-types': ['error', { order: 'asc', type: 'natural' }],
      'perfectionist/sort-named-exports': ['error', { order: 'asc', type: 'natural' }],
      'perfectionist/sort-named-imports': ['error', { order: 'asc', type: 'natural' }],
      'perfectionist/sort-object-types': [
        'error',
        {
          order: 'asc',
          groups: ['index-signature', 'unknown', 'method'],
          type: 'natural',
        },
      ],
      'perfectionist/sort-objects': [
        'error',
        {
          order: 'asc',
          type: 'natural',
          useConfigurationIf: {
            objectType: 'destructured',
          },
        },
        {
          type: 'unsorted',
          useConfigurationIf: {
            objectType: 'non-destructured',
          },
        },
      ],
      'perfectionist/sort-union-types': [
        'error',
        {
          customGroups: [
            {
              groupName: 'false',
              elementNamePattern: '^false$',
            },
            {
              groupName: 'never',
              elementNamePattern: '^never$',
            },
            {
              groupName: 'react',
              elementNamePattern: '^react.+',
            },
          ],
          order: 'asc',
          groups: ['react', 'unknown', 'tuple', 'false', 'nullish', 'never'],
          type: 'natural',
        },
      ],

      ...overrides,
    },
    overrides: [
      {
        files: [`**/*.config.${GLOB_SRC_EXT}`, `**/*.config.*.${GLOB_SRC_EXT}`],
        rules: {
          'perfectionist/sort-objects': [
            'error',
            {
              customGroups: [
                {
                  groupName: 'excludes',
                  elementNamePattern: '^(exclude|excludes)$',
                },
                {
                  groupName: 'extends',
                  elementNamePattern: '^extends$',
                },
                {
                  groupName: 'files',
                  elementNamePattern: '^files$',
                },
                {
                  groupName: 'ignores',
                  elementNamePattern: '^(ignores|ignorePatterns)$',
                },
                {
                  groupName: 'name',
                  elementNamePattern: '^(name|groupName)$',
                },
                {
                  groupName: 'overrides',
                  elementNamePattern: '^overrides$',
                },
                {
                  groupName: 'parser',
                  elementNamePattern: '^parser$',
                },
                {
                  groupName: 'plugins',
                  elementNamePattern: '^plugins$',
                },
                {
                  groupName: 'rules',
                  elementNamePattern: '^rules$',
                },
                {
                  groupName: 'test',
                  elementNamePattern: '^(test|tests)$',
                },
              ],
              groups: [
                'name',
                'files',
                'extends',
                'excludes',
                'ignores',
                'plugins',
                'parser',
                'test',
                'unknown',
                'rules',
                'overrides',
              ],
              newlinesBetween: 0,
              order: 'asc',
              type: 'natural',
            },
          ],
        },
      },
      {
        files: [GLOB_JSX, GLOB_TSX],
        rules: {
          'perfectionist/sort-jsx-props': [
            'error',
            {
              customGroups: [
                {
                  groupName: 'as',
                  elementNamePattern: '^as$',
                },
                {
                  groupName: 'callback',
                  elementNamePattern: '^on.+',
                },
                {
                  groupName: 'children',
                  elementNamePattern: '^children$',
                },
                {
                  groupName: 'key',
                  elementNamePattern: '^key$',
                },
                {
                  groupName: 'ref',
                  elementNamePattern: '^ref$',
                },
                {
                  groupName: 'unsafe',
                  elementNamePattern: '^dangerously.+',
                },
              ],
              groups: [
                'key',
                'ref',
                'as',
                'unknown',
                'shorthand-prop',
                'callback',
                'children',
                'unsafe',
              ],
              type: 'unsorted',
            },
          ],
        },
      },
    ],
  }
}
