function postToAPI<T>(url: string, data: T) {
    return fetch(url, {
        method: 'POST',
        body: data
    });
}

interface Sortable<T> {
    compareTo(value: T): number;
}

class Book implements Sortable<Book> {
    private _title: string;
    private _length: number;
    private _author: string;

    constructor(title: string, author: string, length: number) {
        this._title = title;
        this._author = author;
        this._length = length;
    }

    get length() {
        return this._length;
    }

    get title() {
        return this._title;
    }

    get author() {
        return this._author;
    }

    set length(l: number) {
        if(l > 0)
        this._length = l;
    }

    set author(a: string) {
        if(a.length > 0)
        this._author = a;
    }

    set title(t: string) {
        if (t.length > 0)
        this._title = t;
    }

    public compareTo(book: Book): number {
        if (this._length === book._length) {
            return 0;
        } else if (this._length < book._length) {
            return -1;
        } else return 1;
    }

    public toString(): string {
        return `${this.title} was written by ${this.author} and is ${this.length} pages long.`;
    }
    
}

class BookList {
    private readonly _bookList: Array<Book> = new Array();

    public addBook(book: Book): void {
        this._bookList.push(book);
    }

    get bookList() {
        return this._bookList;
    }

    public removeBook(book: Book): void {
        this._bookList.splice(this._bookList.indexOf(book), 1);
    }

    public sortBooks(): Book[] {
        return this._bookList
            .sort((book1, book2) => book1.compareTo(book2));
    }

}

let list = new BookList();
list.addBook(new Book("1984","George Orwell", 268));
list.addBook(new Book("Treasure Island","Robert Louis Stevenson", 120));
list.addBook(new Book("Journey to the Center of the Earth", "Jules Verne", 160));
list.sortBooks().forEach(book => console.log(book.toString()));


interface WorkingAdult {
    getJobTitle(): string;
    getSalary(): number;
    getYearsExperience(): number;
}

enum Languages {
    Java = "Java",
    Python = "Python",
    Ruby = "Ruby",
    Typescript = "Typescript",
    Javascript = "Javascript",
    CSharp = "C#",
    SQL = "SQL",
    Swift = "Swift",
    R = "R"
}

interface Programmer<PrimaryLanguage extends Languages> extends WorkingAdult {
    getLanguages(): Array<Languages>;
}

class DataScientist implements Programmer<Languages.Python> {
    private yearsExp: number;

    public getLanguages() {
        return [Languages.Python, Languages.R];
    }

    public getJobTitle() {
        return "Data Scientist";
    }

    public getSalary() {
        return 100000;
    }

    public getYearsExperience() {
        return this.yearsExp;
    }

    public machineLearn() {
        console.log("training the model...");
    }
}

class WebDeveloper implements Programmer<Languages.Javascript> {
    private yearsExp: number;
    private languages: Array<Languages>;

    public getLanguages() {
        return this.languages;
    }

    public getJobTitle() {
        return "Web Dev";
    }

    public getSalary() {
        return 60000;
    }

    public getYearsExperience() {
        return this.yearsExp;
    }
}

class NetworkEngineer implements WorkingAdult {
    private yearsExp: number;

    public getJobTitle() {
        return "Network engineer";
    }

    public getSalary() {
        return 70000;
    }

    public getYearsExperience() {
        return this.yearsExp;
    }
}

type ComputerSpecialist = WebDeveloper | DataScientist | NetworkEngineer;
type Guru = WebDeveloper & DataScientist & NetworkEngineer;

let john: ComputerSpecialist = new WebDeveloper();
let jane: Guru = <WebDeveloper & DataScientist & NetworkEngineer> {
    getJobTitle() {
        return "The Great Sage";
    },
    getSalary() {
        return 1000000;
    }
}
