import React, { FC, useEffect } from 'react';
import { useCommand } from '../../../core/react-clean-use-case/useCases';
import { LoadAssetList } from '../../../../application/useCases/assets/LoadAssetList';

export const AssetsPage: FC = () => {
  const loadAssetList = useCommand(LoadAssetList);

  useEffect(() => loadAssetList.execute(), []);

  return (
    <div>
      <div className="row">
        <div className="col">
          <div className="input-group rounded">
            <input
              type="search"
              className="form-control rounded"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="search-addon"
            />
          </div>
          <ul className="list-group">
            <li className="list-group-item disabled" aria-disabled="true">
              Cras justo odio
            </li>
            <li className="list-group-item">Dapibus ac facilisis in</li>
            <li className="list-group-item">Morbi leo risus</li>
            <li className="list-group-item">Porta ac consectetur ac</li>
            <li className="list-group-item">Vestibulum at eros</li>
          </ul>
        </div>
        <div className="col">
          <div className="input-group rounded">
            <input
              type="search"
              className="form-control rounded"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="search-addon"
            />
          </div>
          <ul className="list-group">
            <li className="list-group-item disabled" aria-disabled="true">
              Cras justo odio
            </li>
            <li className="list-group-item">Dapibus ac facilisis in</li>
            <li className="list-group-item">Morbi leo risus</li>
            <li className="list-group-item">Porta ac consectetur ac</li>
            <li className="list-group-item">Vestibulum at eros</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
