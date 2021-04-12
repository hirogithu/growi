import {
  Repository, EntityRepository,
} from 'typeorm';

import { Installation } from '~/entities/installation';

@EntityRepository(Installation)
export class InstallationRepository extends Repository<Installation> {

  findByID(id: string): Promise<Installation | undefined> {
    return this.findOne(id);
  }

  async findByTeamIdOrEnterpriseId(installation:Partial<Installation>): Promise<Installation|undefined> {
    return this.findOne({
      where: [
        { teamId: installation.teamId },
        { enterpriseId: installation.enterpriseId },
      ],
    });
  }

}
