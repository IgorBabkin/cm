export interface IDataMapper<TDomain, TPersistence> {
  toDomain(value: TPersistence): TDomain;

  toPersistence(value: TDomain): TPersistence;
}
