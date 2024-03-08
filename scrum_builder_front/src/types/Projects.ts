export type Project = {
    projectName: string,
    projectCode: string,
    projectTypeId: number,
    platformId: number,
    modules: Array<string>,
    environments: Array<string>,
}