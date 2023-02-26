import { Process, Processor } from '@nestjs/bull';

@Processor('test')
export class TestConsumer {
    
    @Process()
    process(){
        console.log("Processed");
        return {}
    }
}