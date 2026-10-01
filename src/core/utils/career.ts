import { Career } from '@/core/interfaces/career/career.interface';

/** Most recent stage first; entries without a start date keep their relative order at the end. */
export const sortCareerByRecent = (career: Career[]): Career[] =>
    [...career].reverse().sort((a, b) => (b.startDate?.getTime() ?? -Infinity) - (a.startDate?.getTime() ?? -Infinity));

/** Current job, or the most recent one when none is marked as current. */
export const getCurrentJob = (career: Career[]): Career | undefined => {
    const jobs = sortCareerByRecent(career).filter((entry) => (entry.kind ?? 'job') === 'job');
    return jobs.find((entry) => entry.isCurrent) ?? jobs[0];
};
