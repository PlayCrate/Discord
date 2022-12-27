class Commands {
     private cooldown = new Set<string>();

     public set(id: string, ttl: number): void {
          this.cooldown.add(id);
          setTimeout(() => {
               this.delete(id);
          }, ttl);
     }

     public delete(id: string): void {
          this.cooldown.delete(id);
     }

     public has(id: string): boolean {
          return this.cooldown.has(id);
     }
}

export default Commands;
