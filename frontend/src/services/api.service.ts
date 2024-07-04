class ApiService {
    private BASE_URL: string;

    constructor() {
        this.BASE_URL = process.env.REACT_APP_URL || "";
    }

    private async handleResponse(response: Response) {
        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.message || "Something went wrong");
        }
        return response.json();
    }

    public async get(path: string) {
        const url = `${this.BASE_URL}/${path}`;
        const response = await fetch(url);
        return this.handleResponse(response);
    }
}

export default ApiService;
