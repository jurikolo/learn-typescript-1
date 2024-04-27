interface IInsurance {
    id: number;
    status: string;
    setVehicle(vehicle: any): void;
    submit(): Promise<boolean>;
}

class TFInsurance implements IInsurance {
    id: number;
    status: string;
    private vehicle: any;

    setVehicle(vehicle: any): void {
        this.vehicle = vehicle;
    }

    async submit(): Promise<boolean> {
        const res = await fetch('tf', {
            method: 'POST',
            body: JSON.stringify({ vehicle: this.vehicle })
        });
        const data = await res.json();
        return data.isSuccess;
    }
}

class ABInsurance implements IInsurance {
    id: number;
    status: string;
    private vehicle: any;

    setVehicle(vehicle: any): void {
        this.vehicle = vehicle;
    }

    async submit(): Promise<boolean> {
        const res = await fetch('ab', {
            method: 'POST',
            body: JSON.stringify({ vehicle: this.vehicle })
        });
        const data = await res.json();
        return data.isSuccess;
    }
}

abstract class InsuranceFactory {
    db: any;

    abstract createInsurance(): IInsurance;

    saveHistory(insurance: IInsurance) {
        this.db.save(insurance.id, insurance.status);
    }
}

class TFInsuranceFactory extends InsuranceFactory {
    createInsurance(): TFInsurance {
        return new TFInsurance();
    }
}

class ABInsuranceFactory extends InsuranceFactory {
    createInsurance(): ABInsurance {
        return new ABInsurance();
    }
}

const tfInsuranceFactory = new TFInsuranceFactory();
const ins = tfInsuranceFactory.createInsurance();
tfInsuranceFactory.saveHistory(ins)

//-----
// Alternate implementation
const INSURANCE_TYPE = {
    tf: TFInsurance,
    ab: ABInsurance
}

type InsuranceType = typeof INSURANCE_TYPE;

class InsuranceFactoryAlternate {
    db: any;

    createInsurance<T extends keyof InsuranceType>(type: T): InsuranceType[T] {
        return INSURANCE_TYPE[type];
    }

    saveHistory(insurance: IInsurance) {
        this.db.save(insurance.id, insurance.status);
    }
}

const insuranceFactoryAlternate = new InsuranceFactoryAlternate();
const ins2 = new (insuranceFactoryAlternate.createInsurance('tf'));
insuranceFactoryAlternate.saveHistory(ins2);