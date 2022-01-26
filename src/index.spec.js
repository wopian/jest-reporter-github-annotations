import { afterAll, beforeAll, jest } from '@jest/globals'

import Reporter from './index.js'

describe('reporter', () => {
  beforeAll(() => {
    process.env.GITHUB_ACTION = true
  })

  afterAll(() => {
    delete process.env.GITHUB_ACTION
  })

  it('should output nothing with no test results', () => {
    expect.assertions(1)

    const spy = jest.spyOn(console, 'log')

    const reporter = new Reporter()
    reporter.onRunComplete(undefined, {})

    expect(spy.mock.calls).toHaveLength(0)
  })

  it('should output nothing with no failed tests', () => {
    expect.assertions(1)

    const spy = jest.spyOn(console, 'log')

    const reporter = new Reporter()
    reporter.onRunComplete(undefined, {
      numFailedTests: 0,
      testResults: [
        {
          testFilePath: 'example.spec.js',
          testResults: [
            {
              failureMessages: [],
              status: 'passed'
            }
          ]
        }
      ]
    })

    expect(spy.mock.calls).toHaveLength(0)
  })

  it('should output warning if cannot read callstack of failed test results', () => {
    expect.assertions(4)

    const spy = jest.spyOn(console, 'log')

    const reporter = new Reporter()
    reporter.onRunComplete(undefined, {
      numFailedTests: 1,
      testResults: [
        {
          testFilePath: 'example.spec.js',
          testResults: [
            {
              failureMessages: [
                'Error: \u001B[2mexpect.assertions(\u001B[22m\u001B[32m3\u001B[39m\u001B[2m)\u001B[22m\n\nExpected \u001B[32mthree assertions\u001B[39m to be called but received \u001B[31mone assertion call\u001B[39m.'
              ],
              status: 'failed'
            }
          ]
        }
      ]
    })

    expect(spy.mock.calls).toHaveLength(3)
    expect(spy.mock.calls[0][0]).toBe('::group::Test Annotations')
    expect(spy.mock.calls[1][0]).toBe(
      'Unable to extract line number from call stack'
    )
    expect(spy.mock.calls[2][0]).toBe('::endgroup::')
  })

  it('should output annotations of failed test results', () => {
    expect.assertions(4)

    const spy = jest.spyOn(console, 'log')

    const reporter = new Reporter()
    reporter.onRunComplete(undefined, {
      numFailedTests: 1,
      testResults: [
        {
          testFilePath: 'example.spec.js',
          testResults: [
            {
              failureMessages: [
                'Error: \u001B[2mexpect(\u001B[22m\u001B[31mreceived\u001B[39m\u001B[2m).\u001B[22mtoHaveLength\u001B[2m(\u001B[22m\u001B[32mexpected\u001B[39m\u001B[2m)\u001B[22m\n\nExpected length: \u001B[32m0\u001B[39m\nReceived length: \u001B[31m2\u001B[39m\nReceived array:  \u001B[31m[["one"], ["two"]]\u001B[39m\n    at Object.<anonymous> (index.spec.js:37:28)'
              ],
              status: 'failed'
            }
          ]
        },
        {
          testFilePath: 'example2.spec.js',
          testResults: [
            {
              failureMessages: [],
              status: 'passed'
            }
          ]
        }
      ]
    })

    expect(spy.mock.calls).toHaveLength(3)
    expect(spy.mock.calls[0][0]).toBe('::group::Test Annotations')
    expect(spy.mock.calls[1][0]).toBe(
      '::error file=example.spec.js,line=37,col=28::Error: expect(received).toHaveLength(expected)%0A%0AExpected length: 0%0AReceived length: 2%0AReceived array:  [["one"], ["two"]]%0A    at Object.<anonymous> (index.spec.js:37:28)'
    )
    expect(spy.mock.calls[2][0]).toBe('::endgroup::')
  })
})
