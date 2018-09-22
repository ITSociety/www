
import cloneDeep from 'lodash/cloneDeep';
import flatten from 'lodash/flatten';
import uniq from 'lodash/uniq';

/**
 * sort a year by grade, highest to lowest
 * @param {object} u1 First unit
 * @param {object} u2 Second unit
 */
const sortByGrade = (u1, u2) => {
  if (u1.grade > u2.grade) return 1;
  if (u1.grade < u2.grade) return -1;
  return 0;
};

const discountWorstCredits = (year) => {
  const sorted = year.sort(sortByGrade);
  sorted.splice(0, 4); // remove the worst 20 creds
  return sorted;
};

const avgYear = (year) => {
  const total = year
    .map(gr => parseInt(gr.grade, 10))
    .reduce((acc, cur) => acc + cur);
  const mean = total / year.length;
  return mean;
};
/**
 * Standardises the year
 * splits units in groups of 5 credits for easier parsing
 * @param {object[]} year A year worth of credits
 */
const splitCredits = (year) => {
  const normalised = year.map((unit) => {
    const { grade, credits, name } = unit;
    const toPush = credits / 5;
    const normalisedUnit = [];
    for (let i = 0; i < toPush; i += 1) {
      normalisedUnit.push({
        name,
        grade,
        credits: 5,
        originalCredits: credits,
      });
    }
    return normalisedUnit;
  });
  return flatten(normalised);
};

const invalidCredits = (year2, year3) => {
  const total = year2.units
    .concat(year3.units)
    .reduce((acc, cur) => acc + parseInt(cur.credits, 10), 0);
  return total !== 240;
};


const calculateGrades = (units) => {
  // make sure to not fuck with the current state
  const { year2, year3 } = cloneDeep(units);

  if (invalidCredits(year2, year3)) return { err: 'Invalid credits! Should be 120 per year' };

  const [y2disc, y3disc] = [year2.units, year3.units].map(splitCredits).map(discountWorstCredits);

  const [avgY2, avgY3] = [y2disc, y3disc].map(avgYear);

  /**
   * the  classification  of  the  weighted  mean  of  all  relevant  credits
   * at  Level  5  and  all relevant credits at Level 6 in the ratio of 40:60 respectively
   * after first discounting the marks in the worst 20 credits both at Level 5 and at Level 6
   */

  const rule1 = ((avgY2 * 0.4) + (avgY3 * 0.6)).toFixed(3);
  /**
   * the  classification  of  the  weighted  mean  of  all  relevant  credits  at  Level  6
   * after  first discounting the marks in the worst 20 credits at Level 6
   */

  const rule2 = avgY3.toFixed(3);

  /**
   * the minimum classification in which more than 50% of the combined relevant
   * credits at Level 5 and Level 6 were attained after first discounting the marks in the
   * worst 20 credits both at Level 5 and at Level 6
   */

  // fuckery with stringify and parse happens because
  // if we sort, we get units with same grades muddled up
  // it would still give us a correct result, but it doesn't look nice
  const rejoined = y2disc
    .concat(y3disc)
    .map(({ originalCredits, name, grade }) => ({ name, grade, credits: originalCredits }))
    .map(JSON.stringify);

  const sorted = uniq(rejoined).map(JSON.parse).sort(sortByGrade);

  // this rule is basically removing all the worst 20 credits from each year
  // and then finding the one in/or just below the median
  // that's why an "arbirtrary" sorted[4] is used
  const rule3 = parseInt(sorted[4].grade, 10).toFixed(3);

  return { rule1, rule2, rule3 };
};

export default calculateGrades;
