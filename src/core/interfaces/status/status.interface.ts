export interface Status {
    nemonic: 'investigation' | 'planification' | 'designing' | 'developping' | 'deploying' | 'manteinance' | 'finished';
    value: Map<string, string>;
};