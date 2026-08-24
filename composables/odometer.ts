/**
 * MOT records carry the reading three times - OdometerReading in the unit the test was
 * recorded in, plus OdometerInMiles and OdometerInKilometers - and OdometerUnit says which
 * one applies. The report used to print every figure with "miles" appended regardless.
 */
export function useOdometer() {
  const odometerUnit = (record: any): "mi" | "km" =>
    record?.OdometerUnit === "km" ? "km" : "mi";

  const odometerReading = (record: any) => {
    if (!record) return null;

    return odometerUnit(record) === "km"
      ? record.OdometerInKilometers ?? record.OdometerReading ?? null
      : record.OdometerInMiles ?? record.OdometerReading ?? null;
  };

  const odometerLabel = (record: any) =>
    odometerUnit(record) === "km" ? "kilometres" : "miles";

  return { odometerUnit, odometerReading, odometerLabel };
}
