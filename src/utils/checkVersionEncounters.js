export default (versionToMatch) => (encounter) =>
  encounter.version_details.some(
    (versionForEncounter) =>
      versionForEncounter.version_name == versionToMatch.name
  )
