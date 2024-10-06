export interface User {
    firstname: string;
    lastname: string;
    gender: Gender;
    age: number;
}

export interface TableDataProps extends User {
    editButton: React.ReactNode;
    deleteButton: React.ReactNode;
}

export enum Gender {
    male = "Male",
    female = "Female",
}
  