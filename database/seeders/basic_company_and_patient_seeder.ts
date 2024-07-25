import Company from '#apps/shared/models/company'
import Patient from '#apps/shared/models/patient'
import Professionnal from '#apps/shared/models/professionnal'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  async run() {
    const company = await Company.firstOrCreate(
      {
        nationalCode: '340785161',
      },
      {
        address: '371 Avenue Du Doyen Gaston Giraud',
        city: 'Montpellier',
        country: 'France',
        name: 'Centre Hospitalier Universitaire Lapeyronie',
        zipCode: '34295',
        email: 'contact@lapeyronie.fr',
        nationalCode: '340785161',
        phone: '0467336733',
      }
    )

    await Company.firstOrCreate(
      {
        nationalCode: '340796663',
      },
      {
        address: '371 Avenue Du Doyen Gaston Giraud',
        city: 'Montpellier',
        country: 'France',
        name: 'HOPITAL ARNAUD DE VILLENEUVE',
        zipCode: '34295',
        phone: '04 67 33 67 33',
        nationalCode: '340796663',
      }
    )

    await Patient.firstOrCreate(
      {
        oidcId: '9f6ca596-908e-4a53-a977-c2065cf98e44',
      },
      {
        name: 'Nathael',
        oidcId: '9f6ca596-908e-4a53-a977-c2065cf98e44',
        dateOfBirth: DateTime.fromISO('2003-07-05'),
      }
    )

    await Professionnal.firstOrCreate(
      {
        oidcId: '77a1e767-a964-4df4-bda8-28529c243441',
      },
      {
        name: 'Nathalos',
        companyId: company.id,
        licenceNumber: '3723719331',
        oidcId: '77a1e767-a964-4df4-bda8-28529c243441',
        speciality: 'diabetic',
      }
    )
  }
}
