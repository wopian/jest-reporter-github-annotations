export default class GithubActionsReporter {
  onRunComplete(contexts, results) {
    if (
      !process.env.GITHUB_ACTION ||
      results.numFailedTests === 0 ||
      !results?.testResults ||
      results.testResults.length === 0
    )
      return

    console.log('::group::Test Annotations')

    for (const testResultItem of results.testResults) {
      const testFilePath = testResultItem.testFilePath

      for (const result of testResultItem.testResults) {
        if (result.status !== 'failed') {
          continue
        }

        for (const failureMessages of result.failureMessages) {
          const message = failureMessages
            .replace(/\n/g, '%0A')
            .replace(/\033\[[\d;]*m/g, '')
          const captureGroup = message.match(/:(\d+):(\d+)/)

          if (!captureGroup) {
            console.log('Unable to extract line number from call stack')
            continue
          }

          const [, line, col] = captureGroup
          console.log(
            `::error file=${testFilePath},line=${line},col=${col}::${message}`
          )
        }
      }
    }

    console.log('::endgroup::')
  }
}
